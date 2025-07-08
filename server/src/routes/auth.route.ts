import { Router } from 'express';
import { signup, signin } from '../controllers/auth.controller';
import { uploadImage } from '../middlewares/uploadImages';
import { validate } from '../middlewares/validate';
import { signinSchema, signupSchema } from '../utils/validations/auth.schemas';

export const authRouter = Router();

authRouter.post('/signup', uploadImage, validate(signupSchema), signup);
authRouter.post('/signin', validate(signinSchema), signin);
