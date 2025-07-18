import { Request, Response, NextFunction } from 'express';

export const create = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ success: true });
};
