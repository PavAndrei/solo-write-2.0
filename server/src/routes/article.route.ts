import { Router } from 'express';
import { create } from '../controllers/article.controller';
import { uploadMultiplyImages } from '../middlewares/uploadImages';

export const articleRouter = Router();

articleRouter.post('/create', uploadMultiplyImages, create);
