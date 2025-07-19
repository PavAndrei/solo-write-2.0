import jwt, { Secret } from 'jsonwebtoken';
import { errorHandler } from './handleErrors';
import { Request, Response, NextFunction } from 'express';

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token;

  console.log('Token from cookie:', token);

  if (!token) {
    return next(errorHandler(401, 'Unauthorized'));
  }

  jwt.verify(token, process.env.TOKEN_SECRET as Secret, (err, userData) => {
    if (err) {
      return next(errorHandler(401, 'Unauthorized'));
    }
    req.userId = userData.userId;
    next();
  });
};
