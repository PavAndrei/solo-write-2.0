import { Request, Response, NextFunction } from 'express';
import { Error as MongooseError } from 'mongoose';

// Базовый интерфейс для кастомных ошибок
interface CustomError extends Error {
  statusCode?: number;
}

// Интерфейс для ошибок дубликации MongoDB (E11000)
interface MongoDuplicateKeyError extends Error {
  code: number;
  keyPattern: Record<string, any>;
  keyValue: Record<string, any>;
}

// Интерфейс для ошибок валидации Mongoose
interface MongooseValidationError extends MongooseError {
  errors: Record<
    string,
    MongooseError.ValidatorError | MongooseError.CastError
  >;
}

// Объединенный тип для всех возможных ошибок
type AppError =
  | CustomError
  | MongoDuplicateKeyError
  | MongooseValidationError
  | Error;

export const errorHandler = (
  statusCode: number,
  message: string
): CustomError => {
  const error = new Error(message) as CustomError;
  error.statusCode = statusCode;
  return error;
};

export const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if ('code' in err && err.code === 11000) {
    const duplicateError = err as MongoDuplicateKeyError;
    const field = Object.keys(duplicateError.keyPattern)[0];
    const value = duplicateError.keyValue[field];

    return res.status(409).json({
      success: false,
      statusCode: 409,
      message: `The value '${value}' for the field '${field}' is already in use`,
      errorType: 'DUPLICATE_KEY',
      field,
    });
  }

  if ('errors' in err && err.name === 'ValidationError') {
    const validationError = err as MongooseValidationError;
    const messages = Object.values(validationError.errors).map(
      (error) => error.message
    );

    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: messages.join('. '),
      errorType: 'VALIDATION_ERROR',
    });
  }

  const statusCode = 'statusCode' in err ? err.statusCode : 500;
  const message = err.message || 'Internal Server Error';

  return res.status(statusCode || 500).json({
    success: false,
    statusCode,
    message,
  });
};
