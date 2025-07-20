import { FC } from 'react';
import { ArticleList } from '../types/types';
import { ArticleCard } from './ArticleCard';

interface ArticlesListProps {
  articles: ArticleList;
}

export const ArticlesList: FC<ArticlesListProps> = ({ articles }) => {
  return (
    <ul>
      {articles.map((article) => (
        <ArticleCard key={article._id} {...article} />
      ))}
    </ul>
  );
};
