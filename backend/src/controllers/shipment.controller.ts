import { Request, Response, NextFunction } from 'express';
import { Shipment } from '../models/Shipment';
import { Order } from '../models/Order';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { AuthenticatedRequest } from '../middleware/auth';

export const trackShipment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { identifier } = req.params;
    const query = identifier.trim().toUpperCase();

    // Support tracking by AWB or by Order ID
    let shipment = await Shipment.findOne({
      $or: [{ awbNumber: query }, { orderId: query }],
    });

    let order = await Order.findOne({
      $or: [{ awbNumber: query }, { orderId: query }],
    });

    if (!shipment && !order) {
      sendError(
        res,
        `No shipment record found for '${identifier}'. Please check the AWB or Order ID.`,
        404
      );
      return;
    }

    // If shipment exists but order not found or vice versa
    if (!shipment && order) {
      shipment = await Shipment.findOne({ awbNumber: order.awbNumber });
    }

    sendSuccess(
      res,
      {
        shipment,
        order: order
          ? {
              orderId: order.orderId,
              customerName: order.customerName,
              channel: order.channel,
              orderDate: order.orderDate,
              fulfillmentCenter: order.fulfillmentCenter,
              items: order.items,
              totalAmount: order.totalAmount,
              paymentStatus: order.paymentStatus,
              deliveryCity: order.deliveryCity,
              pincode: order.pincode,
              expectedDeliveryDate: order.expectedDeliveryDate,
            }
          : undefined,
      },
      'Tracking details fetched successfully'
    );
  } catch (error) {
    next(error);
  }
};

export const getShipments = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { status, courier, page = 1, limit = 20 } = req.query;
    const filter: any = {};

    if (status && status !== 'All') {
      filter.currentStatus = status;
    }

    if (courier && courier !== 'All') {
      filter.courier = courier;
    }

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(100, Math.max(1, Number(limit)));
    const skip = (pageNum - 1) * limitNum;

    const [shipments, total] = await Promise.all([
      Shipment.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
      Shipment.countDocuments(filter),
    ]);

    sendSuccess(res, shipments, 'Shipments fetched', 200, {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
    });
  } catch (error) {
    next(error);
  }
};

export const addShipmentEvent = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { awbNumber } = req.params;
    const { status, location, description } = req.body;

    const shipment = await Shipment.findOne({ awbNumber: awbNumber.toUpperCase() });
    if (!shipment) {
      sendError(res, 'Shipment not found', 404);
      return;
    }

    shipment.events.unshift({
      status,
      location,
      description,
      timestamp: new Date(),
    });

    shipment.currentStatus = status;
    if (status === 'Delivered') {
      shipment.deliveredAt = new Date();
    }

    await shipment.save();

    // Also sync order shipping status
    await Order.findOneAndUpdate(
      { awbNumber: shipment.awbNumber },
      {
        shippingStatus: status,
        deliveredAt: status === 'Delivered' ? new Date() : undefined,
      }
    );

    sendSuccess(res, shipment, 'Shipment status event recorded');
  } catch (error) {
    next(error);
  }
};
