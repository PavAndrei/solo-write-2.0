// middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { errorHandler } from './handleErrors';

export interface RequestWithId extends Request {
  userId?: string;
}

export const authMiddleware = (
  req: RequestWithId,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(errorHandler(401, 'Not authenticated'));
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as Secret) as {
      userId: string;
    };
    req.userId = decoded.userId;
    next();
  } catch (err) {
    next(errorHandler(401, 'Invalid token'));
  }
};
