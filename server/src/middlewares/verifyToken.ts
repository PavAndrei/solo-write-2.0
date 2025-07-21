import jwt, { Secret, VerifyErrors } from 'jsonwebtoken';
import { errorHandler } from './handleErrors';
import { Request, Response, NextFunction } from 'express';

// Тип для payload токена
interface JwtPayload {
  userId: string;
}

interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const verifyToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(errorHandler(401, 'Unauthorized'));
  }

  jwt.verify(
    token,
    process.env.TOKEN_SECRET as Secret,
    (err: VerifyErrors | null, decoded: unknown) => {
      if (err) {
        return next(errorHandler(401, 'Unauthorized'));
      }

      const userData = decoded as JwtPayload;

      req.userId = userData.userId;

      next();
    }
  );
};
