import { NextFunction, Request, Response } from 'express';
import { compare, hash } from 'bcryptjs';
import jwt, { Secret } from 'jsonwebtoken';

import User from '../models/User.model';
import { errorHandler } from '../middlewares/handleErrors';
import { SigninInput } from '../utils/validations/auth.schemas';
import { ImageRequest } from '../middlewares/uploadImages';
import { RequestWithId } from '../middlewares/checkAuth';

// export const signup = async (
//   req: ImageRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { username, email, password } = req.body;

//   try {
//     const existingUser = await User.findOne({
//       $or: [{ email }, { username }],
//     });

//     if (existingUser) {
//       throw errorHandler(
//         400,
//         existingUser.email === email
//           ? 'Email already in use'
//           : 'Username already taken'
//       );
//     }

//     const hashedPassword = await hash(password, 12);

//     const newUser = new User({
//       username,
//       email,
//       password: hashedPassword,
//       avatarUrl: req.imageUrl || null,
//     });

//     const result = await newUser.save();

//     const { password: removedPassword, ...userWithoutPassword } =
//       result.toObject();

//     res.status(201).json({
//       success: true,
//       message: 'Your account has been created successfully',
//       user: userWithoutPassword,
//     });
//   } catch (err) {
//     next(err);
//   }
// };

export const signup = async (
  req: ImageRequest,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password } = req.body;

  try {
    // Проверка на существующего пользователя
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

    // Хеширование пароля
    const hashedPassword = await hash(password, 12);

    // Создание пользователя
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      avatarUrl: req.imageUrl || null,
    });

    const savedUser = await newUser.save();

    // Генерация токена (как в signin)
    const token = jwt.sign(
      {
        userId: savedUser._id,
        email: savedUser.email,
        verified: savedUser.verified,
        role: savedUser.role,
      },
      process.env.TOKEN_SECRET as Secret,
      { expiresIn: '8h' }
    );

    // Установка куки и возврат данных пользователя
    return res
      .status(201)
      .cookie('access_token', token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production', // HTTPS в продакшене
      })
      .json({
        success: true,
        user: {
          userId: savedUser._id,
          email: savedUser.email,
          role: savedUser.role,
          verified: savedUser.verified,
          username: savedUser.username,
          avatarUrl: savedUser.avatarUrl,
        },
        message: 'Account created and logged in successfully',
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
        secure: process.env.NODE_ENV === 'production',
      })
      .json({
        success: true,
        user: {
          userId: existingUser._id,
          email: existingUser.email,
          role: existingUser.role,
          verified: existingUser.verified,
        },
        message: 'Log in successfully',
      });
  } catch (err) {
    next(err);
  }
};

export const getMe = async (
  req: RequestWithId,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.userId) {
      throw errorHandler(401, 'Not authenticated');
    }

    const user = await User.findById(req.userId).select('-password');

    if (!user) {
      throw errorHandler(404, 'User not found');
    }

    res.status(200).json({
      success: true,
      user: {
        userId: user._id,
        email: user.email,
        role: user.role,
        verified: user.verified,
        username: user.username,
        avatarUrl: user.avatarUrl,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const signout = (req: Request, res: Response) => {
  try {
    res
      .clearCookie('access_token')
      .status(200)
      .json({ success: true, message: 'Logged out successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Logout failed' });
  }
};
