export type Author = {
  articlesCount: number;
  email: string;
  _id: string;
  id: string;
  username: string;
};

export type Article = {
  _id: string;
  _v: number;
  title: string;
  description: string;
  categories: string[];
  likesCount: number;
  images: string[];
  user: Author;
  updatedAt: string;
  createdAt: string;
  likedBy: string[];
  viewsCount: number;
  slug: string;
  content: string;
};

export type UserData = {
  userId: string;
  email: string;
  role: string;
  verified: boolean;
};

export type Comment = {
  content: string;
  articleId: string;
  userId: string;
  likes: string[];
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  numberOfLikes: number;
};

export type ArticleList = Article[];
