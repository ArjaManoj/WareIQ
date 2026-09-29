import { Request, Response, NextFunction } from 'express';
import { Order } from '../models/Order';
import { Shipment } from '../models/Shipment';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { AuthenticatedRequest } from '../middleware/auth';
import { USER_ROLES, SHIPMENT_STATUSES } from '../config/constants';

export const getOrders = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { status, channel, search, page = 1, limit = 15 } = req.query;
    const filter: any = {};

    // Customer role only views their own orders, admin/operations view all
    if (req.user && req.user.role === USER_ROLES.CUSTOMER) {
      filter.customerId = req.user.userId;
    }

    if (status && status !== 'All') {
      filter.$or = [
        { fulfillmentStatus: status },
        { shippingStatus: status },
      ];
    }

    if (channel && channel !== 'All') {
      filter.channel = channel;
    }

    if (search) {
      const searchRegex = new RegExp(String(search), 'i');
      filter.$or = [
        { orderId: searchRegex },
        { awbNumber: searchRegex },
        { customerName: searchRegex },
        { deliveryCity: searchRegex },
        { 'items.name': searchRegex },
        { 'items.sku': searchRegex },
      ];
    }

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(100, Math.max(1, Number(limit)));
    const skip = (pageNum - 1) * limitNum;

    const [orders, total] = await Promise.all([
      Order.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
      Order.countDocuments(filter),
    ]);

    sendSuccess(res, orders, 'Orders fetched successfully', 200, {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
    });
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const order = await Order.findOne({
      $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { orderId: id.toUpperCase() }],
    });

    if (!order) {
      sendError(res, 'Order not found', 404);
      return;
    }

    // Role check
    if (
      req.user &&
      req.user.role === USER_ROLES.CUSTOMER &&
      order.customerId &&
      order.customerId.toString() !== req.user.userId
    ) {
      sendError(res, 'Access forbidden to this order', 403);
      return;
    }

    // Also fetch associated shipment details
    const shipment = await Shipment.findOne({
      $or: [{ awbNumber: order.awbNumber }, { orderId: order.orderId }],
    });

    sendSuccess(res, { order, shipment }, 'Order details retrieved');
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const body = req.body;
    const orderCount = await Order.countDocuments();
    const orderSeq = (orderCount + 1001).toString();
    const orderId = `WIQ-ORD-${orderSeq}`;
    const awbNumber = `WIQ-AWB-2026-${orderSeq}`;

    const totalItems = body.items.reduce((sum: number, item: any) => sum + item.quantity, 0);
    const totalAmount = body.items.reduce(
      (sum: number, item: any) => sum + item.quantity * item.unitPrice,
      0
    );

    const expectedDate = new Date();
    expectedDate.setDate(expectedDate.getDate() + (body.expectedDeliveryDays || 2));

    const newOrder = await Order.create({
      orderId,
      customerId: req.user?.userId,
      customerName: body.customerName,
      channel: body.channel || 'D2C',
      orderDate: new Date(),
      fulfillmentCenter: body.fulfillmentCenter,
      items: body.items,
      totalItems,
      totalAmount,
      paymentStatus: body.paymentStatus || 'Paid',
      fulfillmentStatus: 'Picked',
      shippingStatus: 'In Transit',
      courier: body.courier || 'Delhivery',
      awbNumber,
      deliveryCity: body.deliveryCity,
      pincode: body.pincode,
      expectedDeliveryDate: expectedDate,
    });

    // Create accompanying shipment record
    await Shipment.create({
      awbNumber,
      orderId,
      courier: newOrder.courier,
      origin: newOrder.fulfillmentCenter,
      destination: `${newOrder.deliveryCity} (${newOrder.pincode})`,
      currentStatus: SHIPMENT_STATUSES.IN_TRANSIT,
      estimatedDelivery: expectedDate,
      events: [
        {
          status: 'Order Confirmed',
          location: newOrder.fulfillmentCenter,
          description: 'Order created and routed through Smart Inventory Placement',
          timestamp: new Date(Date.now() - 3600000 * 4),
        },
        {
          status: 'Picked & Packed',
          location: newOrder.fulfillmentCenter,
          description: 'Item picked from automated bins and packed with security seal',
          timestamp: new Date(Date.now() - 3600000 * 2),
        },
        {
          status: 'Dispatched',
          location: newOrder.fulfillmentCenter,
          description: `Handed over to carrier ${newOrder.courier}`,
          timestamp: new Date(Date.now() - 3600000),
        },
        {
          status: 'In Transit',
          location: 'Hub Transit Facility',
          description: 'Package in transit to destination delivery hub',
          timestamp: new Date(),
        },
      ],
    });

    sendSuccess(res, newOrder, 'Order created successfully with live AWB', 201);
  } catch (error) {
    next(error);
  }
};

export const updateOrder = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedOrder) {
      sendError(res, 'Order not found', 404);
      return;
    }

    sendSuccess(res, updatedOrder, 'Order status updated');
  } catch (error) {
    next(error);
  }
};

export const deleteOrder = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      sendError(res, 'Order not found', 404);
      return;
    }

    await Shipment.deleteOne({ awbNumber: order.awbNumber });
    sendSuccess(res, null, 'Order deleted successfully');
  } catch (error) {
    next(error);
  }
};
