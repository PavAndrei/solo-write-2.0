import { FC } from 'react';

interface CommentItemProps {
  content: string;
}

export const CommentItem: FC<CommentItemProps> = ({ content }) => {
  return <li>{content}</li>;
};
