import { Request, Response, NextFunction } from 'express';
import { FulfillmentCenter } from '../models/FulfillmentCenter';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { AuthenticatedRequest } from '../middleware/auth';

export const getFulfillmentCenters = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { zone, city, search } = req.query;
    const filter: any = {};

    if (zone && zone !== 'All') {
      filter.zone = zone;
    }

    if (city && city !== 'All') {
      filter.city = new RegExp(String(city), 'i');
    }

    if (search) {
      const searchRegex = new RegExp(String(search), 'i');
      filter.$or = [
        { name: searchRegex },
        { city: searchRegex },
        { state: searchRegex },
        { address: searchRegex },
        { services: searchRegex },
      ];
    }

    const centers = await FulfillmentCenter.find(filter).sort({ name: 1 });
    sendSuccess(res, centers, 'Fulfillment centers fetched');
  } catch (error) {
    next(error);
  }
};

export const getFCById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const fc = await FulfillmentCenter.findById(req.params.id);
    if (!fc) {
      sendError(res, 'Fulfillment center not found', 404);
      return;
    }
    sendSuccess(res, fc, 'Fulfillment center details retrieved');
  } catch (error) {
    next(error);
  }
};

export const createFC = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const body = req.body;
    const newFC = await FulfillmentCenter.create(body);
    sendSuccess(res, newFC, 'Fulfillment Center registered', 201);
  } catch (error) {
    next(error);
  }
};

export const updateFC = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const updated = await FulfillmentCenter.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) {
      sendError(res, 'Fulfillment center not found', 404);
      return;
    }
    sendSuccess(res, updated, 'Fulfillment center updated');
  } catch (error) {
    next(error);
  }
};
