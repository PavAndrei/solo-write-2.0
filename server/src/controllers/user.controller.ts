import { NextFunction, Request, Response } from 'express';
import User from '../models/User.model';

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { startIndex = 0, limit = 10, activity } = req.query;

    const query = User.find()
      .select('-password -__v')
      .skip(Number(startIndex))
      .limit(Number(limit))
      // Добавляем populate для виртуальных полей
      .populate({
        path: 'comments', // имя виртуального поля
        select: '_id', // выбираем только id для подсчета
        options: { lean: true }, // оптимизация производительности
      });

    // Добавляем сортировку
    if (activity) {
      query.sort({ articlesCount: activity === 'asc' ? 1 : -1 });
    }

    const users = await query.lean().exec(); // lean() для лучшей производительности
    const totalUsers = await User.countDocuments();

    // Преобразуем users чтобы включить commentsCount
    const usersWithCounts = users.map((user) => ({
      ...user,
      commentsCount: user.comments?.length || 0,
      articlesCount: user.articles?.length || 0,
    }));

    res.status(200).json({
      success: true,
      data: usersWithCounts,
      pagination: {
        total: totalUsers,
        startIndex: Number(startIndex),
        limit: Number(limit),
        hasMore: Number(startIndex) + Number(limit) < totalUsers,
      },
    });
  } catch (err) {
    next(err);
  }
};
