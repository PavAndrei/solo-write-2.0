import { FC } from 'react';
import { Button } from './Button';
import { BiLike } from 'react-icons/bi';
import { GrView } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import { Author } from '../types/types';

interface ArticleCardProps {
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
}

export const ArticleCard: FC<ArticleCardProps> = ({
  title,
  description,
  categories,
  likesCount,
  user,
  images,
  updatedAt,
  viewsCount,
  slug,
}) => {
  const date = new Date(updatedAt);

  const navigate = useNavigate();

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

      <div className="flex gap-2 items-center cursor-pointer">
        <GrView className="text-xl" /> <span>{viewsCount}</span>
      </div>

      <Button onClickFunc={() => navigate(slug)}>Read More</Button>
    </li>
  );
};
