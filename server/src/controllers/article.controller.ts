import { Request, Response, NextFunction } from 'express';
import Article from '../models/Article.model';
import mongoose from 'mongoose';
import { errorHandler } from '../middlewares/handleErrors';
import { MultipleImagesRequest } from '../middlewares/uploadImages';
import User from '../models/User.model';

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
      description: req.body.description,
      categories: req.body.category,
      content: req.body.content,
      images: req.imageUrls,
      viewsCount: 0,
      likesCount: 0,
      user: userId,
    });

    const savedArticle = await newArticle.save();

    await User.findByIdAndUpdate(
      userId,
      { $push: { articles: savedArticle._id } },
      { new: true }
    );

    const populatedArticle = await Article.findById(savedArticle._id)
      .populate('user', 'username email avatarUrl')
      .lean();

    return res.status(201).json({
      success: true,
      message: 'The article has been created',
      data: { ...populatedArticle },
    });
  } catch (err) {
    next(err);
  }
};

interface QueryParams {
  startIndex?: string;
  limit?: string;
  order?: string;
  userId?: string;
  category?: string;
  searchTerm?: string;
}

export const getAll = async (
  req: Request<{}, {}, {}, QueryParams>,
  res: Response,
  next: NextFunction
) => {
  try {
    const startIndex = parseInt(req.query.startIndex as string) || 0;
    const limit = parseInt(req.query.limit as string) || 15;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;

    const query: any = {};

    if (req.query.userId) query.userId = req.query.userId;
    if (req.query.category) query.categories = req.query.category;

    if (req.query.searchTerm) {
      query.$or = [
        { title: { $regex: req.query.searchTerm, $options: 'i' } },
        { content: { $regex: req.query.searchTerm, $options: 'i' } },
      ];
    }

    const articles = await Article.find(query)
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit)
      .populate('user', 'username email');

    const totalArticles = await Article.countDocuments(query);

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthArticles = await Article.countDocuments({
      ...query,
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      articles,
      totalArticles,
      lastMonthArticles,
    });
  } catch (error) {
    next(error);
  }
};
