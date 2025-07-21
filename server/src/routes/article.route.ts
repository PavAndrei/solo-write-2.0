import { Router } from 'express';
import {
  create,
  getAll,
  getOneArticle,
} from '../controllers/article.controller';
import { uploadMultiplyImages } from '../middlewares/uploadImages';
import { verifyToken } from '../middlewares/verifyToken';
import { validate } from '../middlewares/validate';
import { editorSchema } from '../utils/validations/editor.schemas';

export const articleRouter = Router();

articleRouter.post(
  '/',
  verifyToken,
  uploadMultiplyImages,
  validate(editorSchema),
  create
);

articleRouter.get('/', getAll);
articleRouter.get('/:slug', getOneArticle);
