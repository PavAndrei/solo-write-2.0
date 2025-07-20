import { Router } from 'express';
import { create } from '../controllers/article.controller';
import { uploadMultiplyImages } from '../middlewares/uploadImages';
import { verifyToken } from '../middlewares/verifyToken';
import { validate } from '../middlewares/validate';
import { editorSchema } from '../utils/validations/editor.schemas';

export const articleRouter = Router();

articleRouter.post(
  '/create',
  verifyToken,
  uploadMultiplyImages,
  validate(editorSchema),
  create
);
