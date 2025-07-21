import { FC } from 'react';
import { Article } from '../types/types';
import { Button } from './Button';
import { BiLike } from 'react-icons/bi';
import { GrView } from 'react-icons/gr';

export const ArticleCard: FC<Article> = ({
  title,
  description,
  categories,
  likesCount,
  user,
  images,
  updatedAt,
  viewsCount,
}) => {
  const date = new Date(updatedAt);

  return (
    <li className="flex flex-col justify-between gap-4 border rounded-md p-2 pt-4">
      <div className="flex flex-col gap-1.5 justify-between min-h-25">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">{title}</h2>
        <span className="text-sm">{date?.toLocaleString().replace(',', ' ')}</span>
      </div>
      <ul className="flex gap-2 flex-wrap">
        {categories.map((category, i) => (
          <li className="py-1 px-2 bg-gray-300 rounded-xl dark:bg-gray-800" key={i}>
            {category}
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-2 flex-1">
        <p>"{description}"</p>
        <div className="mt-auto mb-0 text-sm italic">created by {user.username}</div>
      </div>

      <img
        className="w-full object-cover h-50 rounded-md mt-auto mb-0"
        src={images[0]}
        alt={title}
      />

      <div className="flex gap-2 justify-between">
        <div className="flex gap-2 items-center">
          <BiLike /> <span>{likesCount}</span>
        </div>

        <div className="flex gap-2 items-center">
          <GrView /> <span>{viewsCount}</span>
        </div>
      </div>

      <Button>Read More</Button>
    </li>
  );
};
