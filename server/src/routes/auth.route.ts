import { Router } from 'express';
import { signup, signin } from '../controllers/auth.controller';
import { uploadImage } from '../middlewares/uploadImages';

export const authRouter = Router();

authRouter.post('/signup', uploadImage, signup);
authRouter.post('/signin', signin);
