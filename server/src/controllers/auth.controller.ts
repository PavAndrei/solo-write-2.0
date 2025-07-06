import { NextFunction, Request, Response } from 'express';
import { hash } from 'bcryptjs';

import User from '../models/User.model';
import { errorHandler } from '../middlewares/handleErrors';

interface SignupRequestBody {
  username: string;
  email: string;
  password: string;
}

export const signup = async (
  req: Request<{}, {}, SignupRequestBody>,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      throw errorHandler(
        400,
        existingUser.email === email
          ? 'Email already in use'
          : 'Username already taken'
      );
    }

    const hashedPassword = await hash(password, 12);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const result = await newUser.save();

    const { password: removedPassword, ...userWithoutPassword } =
      result.toObject();

    res.status(201).json({
      success: true,
      message: 'Your account has been created successfully',
      user: userWithoutPassword,
    });
  } catch (err) {
    next(err);
  }
};
