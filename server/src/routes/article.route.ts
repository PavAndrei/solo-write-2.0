import { Router } from 'express';
import { create } from '../controllers/article.controller';
import { uploadMultiplyImages } from '../middlewares/uploadImages';
import { verifyToken } from '../middlewares/verifyToken';

export const articleRouter = Router();

articleRouter.post('/create', verifyToken, uploadMultiplyImages, create);
