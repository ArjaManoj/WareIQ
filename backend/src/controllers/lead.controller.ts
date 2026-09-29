import { Request, Response, NextFunction } from 'express';
import { Lead } from '../models/Lead';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { AuthenticatedRequest } from '../middleware/auth';

export const createLead = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const leadData = req.body;
    const newLead = await Lead.create(leadData);

    sendSuccess(
      res,
      {
        id: newLead._id,
        name: `${newLead.firstName} ${newLead.lastName}`,
        company: newLead.companyName,
        status: newLead.status,
      },
      'Your enquiry has been submitted successfully. A WareIQ enterprise fulfillment specialist will reach out shortly.',
      201
    );
  } catch (error) {
    next(error);
  }
};

export const getLeads = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { status, search, page = 1, limit = 20 } = req.query;
    const filter: any = {};

    if (status && status !== 'All') {
      filter.status = status;
    }

    if (search) {
      const searchRegex = new RegExp(String(search), 'i');
      filter.$or = [
        { firstName: searchRegex },
        { lastName: searchRegex },
        { email: searchRegex },
        { companyName: searchRegex },
        { phone: searchRegex },
      ];
    }

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(100, Math.max(1, Number(limit)));
    const skip = (pageNum - 1) * limitNum;

    const [leads, total] = await Promise.all([
      Lead.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .populate('assignedTo', 'name email'),
      Lead.countDocuments(filter),
    ]);

    sendSuccess(res, leads, 'Leads fetched successfully', 200, {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
    });
  } catch (error) {
    next(error);
  }
};

export const getLeadById = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const lead = await Lead.findById(req.params.id).populate('assignedTo', 'name email');
    if (!lead) {
      sendError(res, 'Lead record not found', 404);
      return;
    }
    sendSuccess(res, lead, 'Lead details retrieved');
  } catch (error) {
    next(error);
  }
};

export const updateLead = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedLead = await Lead.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).populate('assignedTo', 'name email');

    if (!updatedLead) {
      sendError(res, 'Lead not found for update', 404);
      return;
    }

    sendSuccess(res, updatedLead, 'Lead updated successfully');
  } catch (error) {
    next(error);
  }
};

export const deleteLead = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedLead = await Lead.findByIdAndDelete(id);

    if (!deletedLead) {
      sendError(res, 'Lead not found', 404);
      return;
    }

    sendSuccess(res, null, 'Lead removed successfully');
  } catch (error) {
    next(error);
  }
};
