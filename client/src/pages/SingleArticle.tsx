import { AnimatePresence } from 'framer-motion';
import { AnimationProvider } from '../components/AnimationProvider';
import { Container } from '../components/Container';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Author } from '../types/types';
import { Button } from '../components/Button';
import { IoIosArrowBack } from 'react-icons/io';
import { ImagesSlider } from '../components/ImagesSlider';
import { GrView } from 'react-icons/gr';
import { toggleArticleLike } from '../api/apiArticle';
import { LikeButton } from '../components/LikeButton';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { addToast } from '../redux/toast/slice';
import {
  clearCurrentArticle,
  fetchArticle,
  updateArticleLikes,
} from '../redux/singleArticle/slice';
import clsx from 'clsx';
import { SpinnerLoading } from '../components/SpinnerLoading';
import ErrorDisplay from '../components/ErrorDisplay';

type Article = {
  _id: string;
  title: string;
  description: string;
  content: string | TrustedHTML;
  user: Author;
  images: string[];
  likesCount: number;
  viewsCount: number;
  likedBy: string[];
};

export const SingleArticle = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { currentArticle, loading, error } = useAppSelector((state) => state.singleArticle);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      dispatch(fetchArticle(slug));
    }
    return () => {
      dispatch(clearCurrentArticle());
    };
  }, [slug, dispatch]);

  const toggleLike = async (id: string) => {
    if (!user) {
      dispatch(addToast({ color: 'error', text: 'You need to login to like articles' }));
      navigate('/signin');
      return;
    }

    if (!currentArticle) return;

    // Оптимистичное обновление
    const isCurrentlyLiked = currentArticle.likedBy.includes(user.userId);
    const updatedLikesCount = isCurrentlyLiked
      ? currentArticle.likesCount - 1
      : currentArticle.likesCount + 1;
    const updatedLikedBy = isCurrentlyLiked
      ? currentArticle.likedBy.filter((userId) => userId !== user.userId)
      : [...currentArticle.likedBy, user.userId];

    dispatch(
      updateArticleLikes({
        likesCount: updatedLikesCount,
        likedBy: updatedLikedBy,
      })
    );

    try {
      const res = await toggleArticleLike(id);
      if (!res.success) {
        // Откатываем изменения при ошибке
        dispatch(
          updateArticleLikes({
            likesCount: currentArticle.likesCount,
            likedBy: currentArticle.likedBy,
          })
        );
        dispatch(addToast({ color: 'error', text: res.message }));
      }
    } catch (error) {
      // Откатываем изменения при ошибке сети
      dispatch(
        updateArticleLikes({
          likesCount: currentArticle.likesCount,
          likedBy: currentArticle.likedBy,
        })
      );
      dispatch(addToast({ color: 'error', text: 'Failed to update like' }));
    }
  };

  if (loading) return <SpinnerLoading className="absolute top-0" />;
  if (error) return <ErrorDisplay errorMessage={error} hasArticlesButton />;

  return (
    <AnimatePresence>
      <AnimationProvider>
        <Container>
          <section className="py-[60px] md:py-[100px] xl:py-[120px] flex flex-col gap-4 relative">
            <Button onClickFunc={() => navigate(-1)} className="max-w-25 absolute top-10 left-2">
              <IoIosArrowBack /> Back
            </Button>

            {currentArticle && (
              <div className="flex flex-col gap-20 pt-20">
                <article
                  dangerouslySetInnerHTML={currentArticle && { __html: currentArticle.content }}
                  className="article-container flex flex-col gap-5"
                />

                {currentArticle?.images && currentArticle.images.length > 1 ? (
                  <ImagesSlider slides={currentArticle.images} />
                ) : (
                  <img
                    className="w-1/2 self-center object-cover max-h-[500px] rounded-lg"
                    src={currentArticle?.images[0]}
                    alt=""
                  />
                )}

                <div className="flex justify-between items-center pb-5">
                  <div className="flex gap-5">
                    <LikeButton
                      articleId={currentArticle._id}
                      initialLikesCount={currentArticle.likesCount}
                      toggleLike={toggleLike}
                      isLiked={user ? currentArticle.likedBy.includes(user.userId) : false}
                    />

                    <div
                      className={clsx(
                        'flex gap-2 items-center text-2xl',
                        currentArticle.viewsCount === 0 && 'text-gray-500'
                      )}
                    >
                      <GrView /> <span>{currentArticle.viewsCount}</span>
                    </div>
                  </div>

                  <div className="text-right italic text-md">
                    written by{' '}
                    <Link
                      to={`/profile/${currentArticle.user._id}`}
                      className="font-bold underline capitalize cursor-pointer"
                    >
                      {currentArticle?.user.username}
                    </Link>
                  </div>
                </div>
              </div>
            )}

            <Button onClickFunc={() => navigate(-1)} className="max-w-25">
              <IoIosArrowBack /> Back
            </Button>
          </section>
        </Container>
      </AnimationProvider>
    </AnimatePresence>
  );
};
