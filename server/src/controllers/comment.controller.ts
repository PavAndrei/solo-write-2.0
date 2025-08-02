import { Request, Response, NextFunction } from 'express';

export const create = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json('comment');
  } catch (err) {
    next(err);
  }
};
