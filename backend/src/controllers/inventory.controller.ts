import { Request, Response, NextFunction } from 'express';
import { Product } from '../models/Product';
import { InventoryTransaction } from '../models/InventoryTransaction';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { AuthenticatedRequest } from '../middleware/auth';

export const getInventory = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { status, category, fc, search, page = 1, limit = 20 } = req.query;
    const filter: any = {};

    if (status && status !== 'All') {
      filter.status = status;
    }

    if (category && category !== 'All') {
      filter.category = category;
    }

    if (fc && fc !== 'All') {
      filter.fulfillmentCenter = fc;
    }

    if (search) {
      const searchRegex = new RegExp(String(search), 'i');
      filter.$or = [
        { sku: searchRegex },
        { name: searchRegex },
        { brand: searchRegex },
        { category: searchRegex },
        { fulfillmentCenter: searchRegex },
      ];
    }

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(100, Math.max(1, Number(limit)));
    const skip = (pageNum - 1) * limitNum;

    const [products, total, lowStockCount, outOfStockCount] = await Promise.all([
      Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
      Product.countDocuments(filter),
      Product.countDocuments({ status: 'Low Stock' }),
      Product.countDocuments({ status: 'Out of Stock' }),
    ]);

    sendSuccess(
      res,
      {
        products,
        summary: {
          totalSKUs: total,
          lowStockCount,
          outOfStockCount,
          healthyCount: Math.max(0, total - lowStockCount - outOfStockCount),
        },
      },
      'Inventory items fetched',
      200,
      {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      }
    );
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({
      $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { sku: id.toUpperCase() }],
    });

    if (!product) {
      sendError(res, 'Product/SKU not found', 404);
      return;
    }

    // Get recent transactions for this SKU
    const transactions = await InventoryTransaction.find({ sku: product.sku })
      .sort({ createdAt: -1 })
      .limit(10);

    sendSuccess(res, { product, transactions }, 'Product details fetched');
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const body = req.body;
    const existing = await Product.findOne({ sku: body.sku.toUpperCase() });

    if (existing) {
      sendError(res, `SKU ${body.sku} already exists.`, 409);
      return;
    }

    const availableQuantity = Math.max(0, (body.quantity || 0) - (body.reservedQuantity || 0));
    let status: 'In Stock' | 'Low Stock' | 'Out of Stock' = 'In Stock';
    if (body.quantity === 0) status = 'Out of Stock';
    else if (availableQuantity <= (body.reorderLevel || 10)) status = 'Low Stock';

    const product = await Product.create({
      sku: body.sku.toUpperCase(),
      name: body.name,
      category: body.category,
      brand: body.brand,
      quantity: body.quantity || 0,
      reservedQuantity: body.reservedQuantity || 0,
      availableQuantity,
      reorderLevel: body.reorderLevel || 10,
      fulfillmentCenter: body.fulfillmentCenter,
      status,
    });

    if (body.quantity > 0) {
      await InventoryTransaction.create({
        sku: product.sku,
        fulfillmentCenter: product.fulfillmentCenter,
        type: 'INBOUND',
        quantity: body.quantity,
        referenceId: `INIT-STOCK-${Date.now()}`,
        previousQuantity: 0,
        newQuantity: body.quantity,
        reason: 'Initial stock intake on SKU creation',
      });
    }

    sendSuccess(res, product, 'SKU added to inventory catalog', 201);
  } catch (error) {
    next(error);
  }
};

export const adjustStock = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { sku, fulfillmentCenter, type, quantity, reason, referenceId } = req.body;

    const product = await Product.findOne({
      sku: sku.toUpperCase(),
      fulfillmentCenter,
    });

    if (!product) {
      sendError(res, `SKU '${sku}' not found in fulfillment center '${fulfillmentCenter}'`, 404);
      return;
    }

    const prevQty = product.quantity;
    let newQty = prevQty;

    if (type === 'INBOUND' || type === 'RETURN') {
      newQty = prevQty + Math.abs(quantity);
    } else if (type === 'OUTBOUND') {
      if (prevQty < Math.abs(quantity)) {
        sendError(res, `Insufficient stock. Current: ${prevQty}, requested: ${quantity}`, 400);
        return;
      }
      newQty = prevQty - Math.abs(quantity);
    } else if (type === 'ADJUSTMENT' || type === 'TRANSFER') {
      newQty = Math.max(0, prevQty + quantity);
    }

    product.quantity = newQty;
    product.availableQuantity = Math.max(0, newQty - product.reservedQuantity);
    if (newQty === 0) product.status = 'Out of Stock';
    else if (product.availableQuantity <= product.reorderLevel) product.status = 'Low Stock';
    else product.status = 'In Stock';

    await product.save();

    const transaction = await InventoryTransaction.create({
      sku: product.sku,
      fulfillmentCenter,
      type,
      quantity,
      referenceId: referenceId || `ADJ-${Date.now()}`,
      previousQuantity: prevQty,
      newQuantity: newQty,
      reason: reason || 'Manual stock adjustment',
    });

    sendSuccess(res, { product, transaction }, 'Inventory stock updated successfully');
  } catch (error) {
    next(error);
  }
};

export const getTransactions = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { sku, page = 1, limit = 20 } = req.query;
    const filter: any = {};
    if (sku) filter.sku = String(sku).toUpperCase();

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(100, Math.max(1, Number(limit)));
    const skip = (pageNum - 1) * limitNum;

    const [transactions, total] = await Promise.all([
      InventoryTransaction.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
      InventoryTransaction.countDocuments(filter),
    ]);

    sendSuccess(res, transactions, 'Transactions fetched', 200, {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
    });
  } catch (error) {
    next(error);
  }
};
