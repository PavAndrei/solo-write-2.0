import { FC } from 'react';
import { Comment } from '../types/types';
import { FaUser } from 'react-icons/fa';
import { displayLocalTime } from '../utils/displayLocalTime';
import { LikeButton } from './LikeButton';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { useToggleLike } from '../hooks/useToggleLike';
import { updateCommentLike } from '../redux/comment/slice';
import { deleteComment } from '../api/apiComments';

export const CommentItem: FC<Comment> = ({
  _id,
  content,
  userData,
  createdAt,
  numberOfLikes,
  likes,
}) => {
  const { user } = useAppSelector((state) => state.auth);
  const { toggleLike } = useToggleLike();
  const dispatch = useAppDispatch();

  const handleCommentLike = async (id: string) => {
    await toggleLike('comment', id, numberOfLikes, likes, (payload) =>
      dispatch(updateCommentLike(payload))
    );
  };

  const handleDeleteComment = async (id: string) => {
    const result = await deleteComment(id);

    console.log(result);
  };

  const isAuthor = userData ? userData._id === user?.userId : null;

  return (
    <li className="flex gap-3 items-center border border-gray-300 p-2 rounded-md">
      <div className="w-15 h-15 rounded-full border-2 flex items-center justify-center">
        {userData.avatarUrl ? (
          <img
            className="w-full h-full object-cover rounded-full"
            src={userData.avatarUrl}
            alt={'avatar' + userData.username}
          />
        ) : (
          <FaUser className="w-8 h-8" />
        )}
      </div>

      <div className="w-full">
        <div className="flex gap-2 justify-between">
          <span className="font-semibold">{userData.username}</span>
          <span className="text-xs opacity-50">{displayLocalTime(createdAt)}</span>
        </div>
        <p>{content}</p>
        <div className="flex justify-between">
          <LikeButton
            className="text-lg"
            toggleLike={handleCommentLike}
            id={_id}
            initialLikesCount={numberOfLikes}
            isLiked={user ? likes.includes(user?.userId) : false}
          />
          {isAuthor && (
            <button className="border" type="button" onClick={() => handleDeleteComment(_id)}>
              Delete
            </button>
          )}
        </div>
      </div>
    </li>
  );
};
