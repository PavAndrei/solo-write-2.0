import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { addToast } from '../redux/toast/slice';
import { useNavigate } from 'react-router-dom';
import { toggleArticleLike } from '../api/apiArticle';

export const useToggleLike = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const toggleLike = useCallback(
    async (
      articleId: string,
      currentLikesCount: number,
      currentLikedBy: string[],
      updateFn: (payload: { articleId: string; likesCount: number; likedBy: string[] }) => void
    ) => {
      if (!user) {
        dispatch(addToast({ color: 'error', text: 'You need to login to like articles' }));
        navigate('/signin');
        return { success: false };
      }

      const isCurrentlyLiked = currentLikedBy.includes(user.userId);
      const updatedLikesCount = isCurrentlyLiked ? currentLikesCount - 1 : currentLikesCount + 1;
      const updatedLikedBy = isCurrentlyLiked
        ? currentLikedBy.filter((userId) => userId !== user.userId)
        : [...currentLikedBy, user.userId];

      updateFn({
        articleId,
        likesCount: updatedLikesCount,
        likedBy: updatedLikedBy,
      });

      try {
        const res = await toggleArticleLike(articleId);
        if (!res.success) {
          updateFn({
            articleId,
            likesCount: currentLikesCount,
            likedBy: currentLikedBy,
          });
          dispatch(addToast({ color: 'error', text: res.message }));
        }
        return res;
      } catch (error) {
        updateFn({
          articleId,
          likesCount: currentLikesCount,
          likedBy: currentLikedBy,
        });
        dispatch(addToast({ color: 'error', text: 'Failed to update like' }));
        return { success: false, message: 'Network error' };
      }
    },
    [dispatch, navigate, user]
  );

  return { toggleLike };
};
