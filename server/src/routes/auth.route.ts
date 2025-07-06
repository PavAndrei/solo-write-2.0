import { Router } from 'express';
import { signup } from '../controllers/auth.controller';
import { uploadImage } from '../middlewares/uploadImages';

export const authRouter = Router();

authRouter.post('/signup', uploadImage, signup);
