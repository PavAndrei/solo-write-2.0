import { FC } from 'react';
import { Article } from '../types/types';

export const ArticleCard: FC<Article> = ({ title, category, imagesPaths, content }) => {
  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {category.map((category, i) => (
          <li key={category + i}>{category}</li>
        ))}
      </ul>
      <ul>
        {imagesPaths.map((path, i) => (
          <li key={path + i}>
            <img src={path} alt={`image-${i}`} />
          </li>
        ))}
      </ul>
      <div>{content}</div>
    </div>
  );
};
