export type Author = {
  articlesCount: number;
  email: string;
  _id: string;
  id: string;
  username: string;
};

export type Article = {
  _id: string;
  title: string;
  description: string;
  categories: string[];
  likesCount: number;
  images: string[];
  user: Author;
  updatedAt: string;
  viewsCount: number;
  slug: string;
};

export type ArticleList = Article[];
