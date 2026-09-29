import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { AuthenticatedRequest } from '../middleware/auth';

export const getUsers = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { role, search, page = 1, limit = 20 } = req.query;
    const filter: any = {};

    if (role && role !== 'All') {
      filter.role = role;
    }

    if (search) {
      const searchRegex = new RegExp(String(search), 'i');
      filter.$or = [
        { name: searchRegex },
        { email: searchRegex },
        { companyName: searchRegex },
      ];
    }

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(100, Math.max(1, Number(limit)));
    const skip = (pageNum - 1) * limitNum;

    const [users, total] = await Promise.all([
      User.find(filter).select('-passwordHash').sort({ createdAt: -1 }).skip(skip).limit(limitNum),
      User.countDocuments(filter),
    ]);

    sendSuccess(res, users, 'Users fetched', 200, {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { role, isActive, companyName, phone, name } = req.body;

    const updated = await User.findByIdAndUpdate(
      id,
      { role, isActive, companyName, phone, name },
      { new: true }
    ).select('-passwordHash');

    if (!updated) {
      sendError(res, 'User not found', 404);
      return;
    }

    sendSuccess(res, updated, 'User updated successfully');
  } catch (error) {
    next(error);
  }
};
