import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  statusCode: number,
  message: string
): CustomError => {
  const error = new Error(message) as CustomError;
  error.statusCode = statusCode;
  return error;
};

export const globalErrorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
};
