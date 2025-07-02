import { hash } from 'bcryptjs';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import User from '../models/User.model';

// export const signup: RequestHandler = async (req, res) => {
//   const { username, email, password } = req.body;

//   if (!username || !email || !password) {
//     return res.status(400).json({ error: 'Invalid input data' });
//   }

//   try {
//     const existingUser = await User.findOne({
//       $or: [{ email }, { username }],
//     });

//     if (existingUser) {
//       res.status(400).json({
//         success: false,
//         message:
//           existingUser.email === email
//             ? 'Email already in use'
//             : 'Username already taken',
//       });
//       return;
//     }

//     const hashedPassword = await hash(password, 12);

//     const newUser = new User({
//       username,
//       email,
//       password: hashedPassword,
//     });

//     const result = await newUser.save();

//     const { password: removedPassword, ...userWithoutPassword } =
//       result.toObject();

//     res.status(201).json({
//       success: true,
//       message: 'Your account has been created successfully',
//       userWithoutPassword,
//     });
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// };

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
      return res.status(400).json({
        success: false,
        message:
          existingUser.email === email
            ? 'Email already in use'
            : 'Username already taken',
      });
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
      userWithoutPassword,
    });
  } catch (err) {
    next(err);
  }
};
