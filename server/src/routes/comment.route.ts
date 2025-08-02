import { Router } from 'express';
import { create } from '../controllers/comment.controller';

export const commentRouter = Router();

commentRouter.post('/create', create);
