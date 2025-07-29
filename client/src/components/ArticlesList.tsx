import { FC } from 'react';
import { ArticleList } from '../types/types';
import { ArticleCard } from './ArticleCard';
import { FaRegFaceSmileWink } from 'react-icons/fa6';

interface ArticlesListProps {
  articles?: ArticleList;
}

export const ArticlesList: FC<ArticlesListProps> = ({ articles }) => {
  if (articles?.length === 0) {
    return (
      <div className="text-lg flex gap-1.5 items-center justify-center pt-10">
        No articles has been found by these filters. Please, try to change the selected categories
        to get some relevant posts...
        <FaRegFaceSmileWink />
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {articles?.map((item) => (
        <ArticleCard key={item._id} {...item} />
      ))}
    </ul>
  );
};
