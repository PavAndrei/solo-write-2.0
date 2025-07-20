export type Article = {
  _id: string;
  title: string;
  category: string[];
  imagesPaths: string[];
  content: string;
};

export type ArticleList = Article[];
