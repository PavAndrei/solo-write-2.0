import { Router } from 'express';
import {
  create,
  getArticleComments,
  getAll,
  toggleLike,
  deleteComment,
} from '../controllers/comment.controller';
import { verifyToken } from '../middlewares/verifyToken';
import { validate } from '../middlewares/validate';
import { commentSchema } from '../utils/validations/comment.schemas';

export const commentRouter = Router();

commentRouter.post('/create', verifyToken, validate(commentSchema), create);
commentRouter.get('/:id', getArticleComments);
commentRouter.get('/', getAll);
commentRouter.patch('/:id/like', verifyToken, toggleLike);
commentRouter.delete('/:id/', verifyToken, deleteComment);
