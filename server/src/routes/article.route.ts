import { Router } from 'express';
import { create } from '../controllers/article.controller';

export const articleRouter = Router();

articleRouter.post('/create', create);
