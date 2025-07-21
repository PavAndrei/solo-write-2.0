import { FC } from 'react';
import { ArticleList } from '../types/types';
import { ArticleCard } from './ArticleCard';

interface ArticlesListProps {
  articles: ArticleList;
}

export const ArticlesList: FC<ArticlesListProps> = ({ articles }) => {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {articles.map((item) => (
        <ArticleCard key={item._id} {...item} />
      ))}
    </ul>
  );
};
