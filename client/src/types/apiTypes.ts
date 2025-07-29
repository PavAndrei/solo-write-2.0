// Api Response Types

import { Article, ArticleList, UserData } from './types';

// Status

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

// Base Api Response Type

export type ApiResponse = {
  success: boolean;
  message: string;
};

// Api Authentification Response Type

export type ApiAuthResponse = ApiResponse & {
  user?: UserData;
};

// Api Article Response Types

export type ApiCreateArticleResponse = ApiResponse & {
  data?: Article;
};

export type GetAllArticlesApiResponse = ApiResponse & {
  articles?: ArticleList;
  totalArticles?: number;
  lastMonthArticles?: number;
};

export type ToggleArticleLikeApiResponse = ApiResponse & {
  likesCount?: number;
};

// Api Article Query Params

export type GetAllArticlesParams = {
  startIndex?: number;
  limit?: number;
  order?: string;
  categories?: string[];
  searchTerm?: string;
};
