import { Router } from 'express';
import { create, getArticleComments } from '../controllers/comment.controller';
import { verifyToken } from '../middlewares/verifyToken';
import { validate } from '../middlewares/validate';
import { commentSchema } from '../utils/validations/comment.schemas';

export const commentRouter = Router();

commentRouter.post('/create', verifyToken, validate(commentSchema), create);
commentRouter.get('/:id', getArticleComments);
