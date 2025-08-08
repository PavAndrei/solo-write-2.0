import { Router } from 'express';
import { getAll } from '../controllers/user.controller';

export const userRouter = Router();

userRouter.get('/', getAll);
