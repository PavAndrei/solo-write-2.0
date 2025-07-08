import { NextFunction, Request, Response } from 'express';
import { compare, hash } from 'bcryptjs';
import jwt, { Secret } from 'jsonwebtoken';

import User from '../models/User.model';
import { errorHandler } from '../middlewares/handleErrors';
import { SigninInput } from '../utils/validations/auth.schemas';
import { ImageRequest } from '../middlewares/uploadImages';

export const signup = async (
  req: ImageRequest,
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
      avatarUrl: req.imageUrl || null,
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

export const signin = async (
  req: Request<{}, {}, SigninInput>,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email }).select('+password');

    if (!existingUser) {
      throw errorHandler(401, 'Invalid email or password');
    }

    const result = await compare(password, existingUser.password);

    if (!result) {
      throw errorHandler(401, 'Invalid email or password');
    }

    const token = jwt.sign(
      {
        userId: existingUser._id,
        email: existingUser.email,
        verified: existingUser.verified,
        role: existingUser.role,
      },
      process.env.TOKEN_SECRET as Secret,
      { expiresIn: '8h' }
    );

    return res
      .status(200)
      .cookie('access_token', token, {
        httpOnly: true,
        sameSite: 'lax',
      })
      .json({ success: true, message: 'Log in successfully' });
  } catch (err) {
    next(err);
  }
};
