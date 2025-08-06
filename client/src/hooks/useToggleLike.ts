import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { addToast } from '../redux/toast/slice';
import { useNavigate } from 'react-router-dom';
import { toggleArticleLike } from '../api/apiArticle';
import { toggleCommentLike } from '../api/apiComments';

type LikeableEntity = 'article' | 'comment';

export const useToggleLike = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const toggleLike = useCallback(
    async (
      entityType: LikeableEntity,
      entityId: string,
      currentLikesCount: number,
      currentLikedBy: string[],
      updateFn: (payload: { entityId: string; likesCount: number; likedBy: string[] }) => void
    ) => {
      if (!user) {
        dispatch(
          addToast({
            color: 'error',
            text: 'You need to login to like content',
          })
        );
        navigate('/signin');
        return { success: false };
      }

      // Оптимистичное обновление
      const isCurrentlyLiked = currentLikedBy.includes(user.userId);
      const updatedLikesCount = isCurrentlyLiked ? currentLikesCount - 1 : currentLikesCount + 1;
      const updatedLikedBy = isCurrentlyLiked
        ? currentLikedBy.filter((userId) => userId !== user.userId)
        : [...currentLikedBy, user.userId];

      updateFn({
        entityId,
        likesCount: updatedLikesCount,
        likedBy: updatedLikedBy,
      });

      try {
        const res =
          entityType === 'article'
            ? await toggleArticleLike(entityId)
            : await toggleCommentLike(entityId);

        if (!res?.success) {
          // Откатываем изменения при ошибке
          updateFn({
            entityId,
            likesCount: currentLikesCount,
            likedBy: currentLikedBy,
          });
          dispatch(addToast({ color: 'error', text: res?.message }));
        }
        return res;
      } catch (error) {
        // Откатываем изменения при ошибке сети
        updateFn({
          entityId,
          likesCount: currentLikesCount,
          likedBy: currentLikedBy,
        });
        dispatch(
          addToast({
            color: 'error',
            text: 'Failed to update like',
          })
        );
        return { success: false, message: 'Network error' };
      }
    },
    [dispatch, navigate, user]
  );

  return { toggleLike };
};
