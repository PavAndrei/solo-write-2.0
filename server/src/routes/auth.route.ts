import { Router } from 'express';
import { signup, signin, getMe } from '../controllers/auth.controller';
import { uploadImage } from '../middlewares/uploadImages';
import { validate } from '../middlewares/validate';
import { signinSchema, signupSchema } from '../utils/validations/auth.schemas';
import { authMiddleware } from '../middlewares/checkAuth';

export const authRouter = Router();

authRouter.post('/signup', uploadImage, validate(signupSchema), signup);
authRouter.post('/signin', validate(signinSchema), signin);
authRouter.get('/me', authMiddleware, getMe);
