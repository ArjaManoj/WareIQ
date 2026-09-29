import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';
import { generateToken } from '../utils/jwt';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { AuthenticatedRequest } from '../middleware/auth';
import { USER_ROLES } from '../config/constants';

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, password, companyName, phone, role } = req.body;

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      sendError(res, 'An account with this email address already exists.', 409);
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      passwordHash,
      companyName: companyName || 'WareIQ Demo Merchant',
      phone: phone || '',
      role: role || USER_ROLES.CUSTOMER,
      isActive: true,
    });

    const token = generateToken({
      userId: newUser._id.toString(),
      email: newUser.email,
      role: newUser.role,
      name: newUser.name,
      companyName: newUser.companyName,
    });

    sendSuccess(
      res,
      {
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          companyName: newUser.companyName,
          phone: newUser.phone,
          isActive: newUser.isActive,
        },
        token,
      },
      'User account registered successfully',
      201
    );
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      sendError(res, 'Invalid credentials. Please verify your email and password.', 401);
      return;
    }

    if (!user.isActive) {
      sendError(res, 'Your account is deactivated. Please contact support.', 403);
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      sendError(res, 'Invalid credentials. Please verify your email and password.', 401);
      return;
    }

    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
      name: user.name,
      companyName: user.companyName,
    });

    sendSuccess(
      res,
      {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          companyName: user.companyName,
          phone: user.phone,
          isActive: user.isActive,
        },
        token,
      },
      'Logged in successfully'
    );
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  sendSuccess(res, null, 'Logged out successfully');
};

export const getMe = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      sendError(res, 'Authentication required', 401);
      return;
    }

    const user = await User.findById(req.user.userId).select('-passwordHash');
    if (!user) {
      sendError(res, 'User account not found', 404);
      return;
    }

    sendSuccess(
      res,
      {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        companyName: user.companyName,
        phone: user.phone,
        isActive: user.isActive,
        createdAt: user.createdAt,
      },
      'User profile retrieved successfully'
    );
  } catch (error) {
    next(error);
  }
};
