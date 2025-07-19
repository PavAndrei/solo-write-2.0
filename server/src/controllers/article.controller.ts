import { Response, NextFunction } from 'express';
import Article from '../models/Article.model';
import mongoose from 'mongoose';
import { errorHandler } from '../middlewares/handleErrors';
import { MultipleImagesRequest } from '../middlewares/uploadImages';

export const create = async (
  req: MultipleImagesRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userId;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return next(errorHandler(400, 'Invalid or missing userId'));
  }

  try {
    const newArticle = new Article({
      title: req.body.title,
      categories: req.body.categories,
      content: req.body.content,
      images: req.imageUrls,
      viewsCount: 0,
      likesCount: 0,
      user: userId,
    });

    const savedArticle = await newArticle.save();
    const populatedArticle = await savedArticle.populate('user', '-password');

    return res.status(201).json(populatedArticle);
  } catch (err) {
    next(err);
  }
};
