import { FC } from 'react';
import { Comment } from '../types/types';

interface CommentListProps {
  comments?: Comment[];
}

export const CommentList: FC<CommentListProps> = ({ comments }) => {
  if (!comments || comments?.length === 0) {
    return <div>Comments haven't been added to this article yet.</div>;
  }

  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment._id}>{comment.content}</li>
      ))}
    </ul>
  );
};
