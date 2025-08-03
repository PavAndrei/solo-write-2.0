import { Request, Response, NextFunction } from 'express';
import { errorHandler } from '../middlewares/handleErrors';
import mongoose from 'mongoose';
import Comment from '../models/Comment.model';

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

    res.status(200).json(newComment);
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
    const comments = await Comment.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });

    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
};
