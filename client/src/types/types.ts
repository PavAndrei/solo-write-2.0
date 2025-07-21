export type Author = {
  articlesCount: number;
  email: string;
  _id: string;
  username: string;
};

export type Article = {
  _id: string;
  title: string;
  description: string;
  categories: string[];
  imagesPaths: string[];
  content: string;
  author: Author;
};

export type ArticleList = Article[];
