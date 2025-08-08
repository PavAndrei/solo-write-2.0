import { Request, Response, NextFunction } from 'express';
import Article from '../models/Article.model';
import mongoose, { Types } from 'mongoose';
import { errorHandler } from '../middlewares/handleErrors';
import { MultipleImagesRequest } from '../middlewares/uploadImages';
import User from '../models/User.model';
import Comment from '../models/Comment.model';

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
    const slug = req.body.title
      .split(' ')
      .join('-')
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, '');

    const newArticle = new Article({
      title: req.body.title,
      description: req.body.description,
      categories: req.body.category,
      content: req.body.content,
      images: req.imageUrls,
      viewsCount: 0,
      likesCount: 0,
      user: userId,
      slug,
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

    if (req.query.category) {
      const categories = (req.query.category as string).split(',');
      query.categories = { $all: categories };
    }

    if (req.query.searchTerm) {
      query.$or = [
        { title: { $regex: req.query.searchTerm, $options: 'i' } },
        { content: { $regex: req.query.searchTerm, $options: 'i' } },
      ];
    }

    const articles = await Article.find(query)
      .sort({ createdAt: sortDirection })
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
      success: true,
      message: 'Sent all the articles',
      articles,
      totalArticles,
      lastMonthArticles,
    });
  } catch (err) {
    next(err);
  }
};

export const getOneArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { slug } = req.params;

    const article = await Article.findOneAndUpdate(
      { slug },
      { $inc: { viewsCount: 1 } },
      { new: true }
    ).populate('user', 'username avatarUrl');

    if (!article) {
      return next(errorHandler(404, 'Article is not found'));
    }

    res.status(200).json({
      success: true,
      message: 'The article has been sent to the client',
      data: article,
    });
  } catch (err) {
    next(err);
  }
};

interface RequestWithUserId extends Request {
  userId?: Types.ObjectId;
}

export const toggleLike = async (
  req: RequestWithUserId,
  res: Response,
  next: NextFunction
) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return next(errorHandler(404, 'Article not found'));

    const userId = req.userId;
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return next(errorHandler(400, 'Invalid or missing userId'));
    }

    const likeIndex = article.likedBy.indexOf(userId);

    if (likeIndex === -1) {
      article.likedBy.push(userId);
      article.likesCount += 1;
    } else {
      article.likedBy.splice(likeIndex, 1);
      article.likesCount -= 1;
    }

    await article.save();
    res.status(200).json({
      success: true,
      message: 'The article like has been toggled',
      likesCount: article.likesCount,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteArticle = async (
  req: RequestWithUserId,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return next(errorHandler(400, 'Invalid or missing userId'));
    }

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return next(errorHandler(400, 'Invalid article ID'));
    }

    // Проверяем роль пользователя
    const user = await User.findById(userId);
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }

    const isAdmin = user.role === 'admin';

    // Для админа просто находим статью, для обычного пользователя - проверяем владельца
    const article = isAdmin
      ? await Article.findById(id)
      : await Article.findOne({ _id: id, user: userId });

    if (!article) {
      return next(
        errorHandler(
          404,
          'Article not found' + (isAdmin ? '' : ' or you are not the owner')
        )
      );
    }

    // Удаляем все комментарии, связанные с этой статьей
    await Comment.deleteMany({ articleId: id });

    // Удаляем статью
    await Article.findByIdAndDelete(id);

    // Удаляем ссылку на статью из профиля автора статьи
    await User.findByIdAndUpdate(
      article.user, // ID автора статьи
      { $pull: { articles: id } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message:
        'The article and all related comments have been deleted successfully',
    });
  } catch (err) {
    next(err);
  }
};
