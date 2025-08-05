import clsx from 'clsx';
import { FC } from 'react';
import { BiLike } from 'react-icons/bi';
import { motion } from 'framer-motion';

interface LikeButtonProps {
  id: string;
  initialLikesCount: number;
  isLiked: boolean;
  className?: string;
  toggleLike: (id: string) => void;
}

export const LikeButton: FC<LikeButtonProps> = ({
  id,
  initialLikesCount,
  isLiked,
  toggleLike,
  className,
}) => {
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      type="button"
      onClick={() => toggleLike(id)}
      className={clsx(
        'flex gap-2 items-center text-2xl transition-colors cursor-pointer',
        isLiked ? 'text-red-400' : 'hover:text-red-400',
        initialLikesCount === 0 && 'text-gray-400',
        className
      )}
      aria-label={isLiked ? 'Unlike this article' : 'Like this article'}
    >
      <BiLike className={isLiked ? 'fill-current' : 'stroke-current'} />
      <span>{initialLikesCount}</span>
    </motion.button>
  );
};
