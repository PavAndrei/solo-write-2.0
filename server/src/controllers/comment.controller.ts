import { Request, Response, NextFunction } from 'express';
import { errorHandler } from '../middlewares/handleErrors';
import mongoose from 'mongoose';
import Comment from '../models/Comment.model';
import User from '../models/User.model';

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userId;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return next(errorHandler(403, 'You are not allowed to create a comment'));
  }

  const { content, articleId } = req.body;

  try {
    const newComment = new Comment({
      content,
      articleId,
      userId,
      likes: [],
    });

    await newComment.save();

    res.status(200).json({
      success: true,
      message: 'Comment has been added',
      data: newComment,
    });
  } catch (err) {
    next(err);
  }
};

export const getArticleComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const comments = await Comment.find({
      articleId: req.params.id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      message: 'All comments for the current article has been sent',
      data: comments,
    });
  } catch (err) {
    next(err);
  }
};

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Получаем параметры из query
    const {
      limit = '10',
      startIndex = '0',
      searchTerm = '',
      sortByDate = 'desc',
      sortByLikes,
    } = req.query;

    // Парсим числовые параметры
    const limitNum = parseInt(limit as string);
    const startIndexNum = parseInt(startIndex as string);

    // Строим базовый запрос
    let query = Comment.find();

    // Фильтрация по searchTerm (регистронезависимый поиск)
    if (searchTerm) {
      query = query
        .where('content')
        .regex(new RegExp(searchTerm as string, 'i'));
    }

    // Сортировка по дате
    const sortOrderDate = sortByDate === 'asc' ? 1 : -1;
    query = query.sort({ createdAt: sortOrderDate });

    // Сортировка по лайкам (используем агрегацию для виртуального поля)
    if (sortByLikes === 'asc' || sortByLikes === 'desc') {
      const sortOrderLikes = sortByLikes === 'asc' ? 1 : -1;

      // Используем агрегацию для сортировки по количеству лайков
      const aggregation = await Comment.aggregate([
        {
          $addFields: {
            numberOfLikes: { $size: '$likes' },
          },
        },
        { $sort: { numberOfLikes: sortOrderLikes } },
        { $skip: startIndexNum },
        { $limit: limitNum },
        ...(searchTerm
          ? [{ $match: { content: { $regex: searchTerm, $options: 'i' } } }]
          : []),
      ]).exec();

      // Получаем полные документы с populate
      const populatedComments = await Comment.populate(aggregation, [
        { path: 'userId', select: 'username avatarUrl' },
        { path: 'articleId', select: 'title slug' },
      ]);

      return res.status(200).json({
        success: true,
        data: populatedComments,
        total: await Comment.countDocuments(
          searchTerm ? { content: { $regex: searchTerm, $options: 'i' } } : {}
        ),
        limit: limitNum,
        startIndex: startIndexNum,
      });
    }

    // Применяем пагинацию для обычного запроса
    query = query.skip(startIndexNum).limit(limitNum);

    // Добавляем populate для связанных данных
    query = query.populate([
      { path: 'userId', select: 'username avatarUrl' },
      { path: 'articleId', select: 'title slug' },
    ]);

    const comments = await query.exec();
    const total = await Comment.countDocuments(
      searchTerm ? { content: { $regex: searchTerm, $options: 'i' } } : {}
    );

    res.status(200).json({
      success: true,
      data: comments,
      total,
      limit: limitNum,
      startIndex: startIndexNum,
    });
  } catch (err) {
    next(err);
  }
};

export const toggleLike = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: commentId } = req.params;
    const userId = req.userId; // userId из middleware аутентификации

    // Проверяем валидность ID
    // if (!Types.ObjectId.isValid(commentId)) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: 'Invalid comment ID' });
    // }

    // Находим комментарий
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res
        .status(404)
        .json({ success: false, message: 'Comment not found' });
    }

    // Проверяем, есть ли уже лайк от этого пользователя
    const likeIndex = comment.likes.findIndex(
      (like) => like.toString() === userId.toString()
    );

    let updatedComment;
    let action: 'added' | 'removed';

    if (likeIndex === -1) {
      // Добавляем лайк
      updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        { $addToSet: { likes: userId } }, // $addToSet предотвращает дубликаты
        { new: true, runValidators: true }
      ).populate('likes', 'username avatarUrl');
      action = 'added';
    } else {
      // Удаляем лайк
      updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        { $pull: { likes: userId } },
        { new: true, runValidators: true }
      ).populate('likes', 'username avatarUrl');
      action = 'removed';
    }

    res.status(200).json({
      success: true,
      message: `Like ${action} successfully`,
      data: {
        comment: updatedComment,
        numberOfLikes: updatedComment?.likes.length || 0,
        isLiked: action === 'added',
      },
    });
  } catch (err) {
    next(err);
  }
};

export const deleteComment = async (
  // req: RequestWithUserId,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: commentId } = req.params;
    const userId = req.userId; // userId из middleware аутентификации

    // Проверяем валидность ID комментария
    // if (!Types.ObjectId.isValid(commentId)) {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'Invalid comment ID format',
    //   });
    // }

    // Находим комментарий
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found',
      });
    }

    // Находим пользователя, который пытается удалить
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Проверяем права доступа
    const isAuthor = comment.userId.toString() === userId.toString();
    const isAdmin = user.role === 'admin';

    if (!isAuthor && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to delete this comment',
      });
    }

    // Удаляем комментарий
    await Comment.findByIdAndDelete(commentId);

    res.status(200).json({
      success: true,
      message: 'Comment deleted successfully',
    });
  } catch (err) {
    next(err);
  }
};

export const updateComment = async (
  // req: RequestWithUserId,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: commentId } = req.params;
    const { content } = req.body;
    const userId = req.userId;

    // Валидация ID комментария
    // if (!Types.ObjectId.isValid(commentId)) {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'Invalid comment ID format',
    //   });
    // }

    // Проверка наличия контента
    if (!content || typeof content !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Content is required and must be a string',
      });
    }

    // Находим комментарий
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found',
      });
    }

    // Находим пользователя
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Проверка прав доступа
    const isAuthor = comment.userId.toString() === userId.toString();
    const isAdmin = user.role === 'admin';

    if (!isAuthor && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to edit this comment',
      });
    }

    // Обновляем комментарий
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { content },
      { new: true, runValidators: true }
    ).populate('userId', 'username avatarUrl');

    res.status(200).json({
      success: true,
      message: 'Comment updated successfully',
      data: updatedComment,
    });
  } catch (err) {
    next(err);
  }
};
