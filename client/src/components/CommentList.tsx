import { FC } from 'react';
import { Comment } from '../types/types';
import { CommentItem } from './CommentItem';

interface CommentListProps {
  comments?: Comment[];
}

export const CommentList: FC<CommentListProps> = ({ comments }) => {
  if (!comments || comments?.length === 0) {
    return <div>Comments haven't been added to this article yet.</div>;
  }

  console.log(comments);

  return (
    <ul className="flex flex-col gap-3.5 py-4">
      {comments.map((comment) => (
        <CommentItem key={comment._id} {...comment} />
      ))}
    </ul>
  );
};
