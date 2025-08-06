import { AnimatePresence } from 'framer-motion';
import { AnimationProvider } from '../components/AnimationProvider';
import { Container } from '../components/Container';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Author } from '../types/types';
import { Button } from '../components/Button';
import { IoIosArrowBack } from 'react-icons/io';
import { ImagesSlider } from '../components/ImagesSlider';
import { GrView } from 'react-icons/gr';
import { LikeButton } from '../components/LikeButton';
import { useAppDispatch, useAppSelector } from '../redux/store';
import {
  clearCurrentArticle,
  fetchArticle,
  updateArticleLikes,
} from '../redux/singleArticle/slice';
import clsx from 'clsx';
import { SpinnerLoading } from '../components/SpinnerLoading';
import ErrorDisplay from '../components/ErrorDisplay';
import { useToggleLike } from '../hooks/useToggleLike';
import { CommentSection } from '../components/CommentSection';

export const SingleArticle = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { currentArticle, loading, error } = useAppSelector((state) => state.singleArticle);

  const { slug } = useParams();
  const navigate = useNavigate();

  const { toggleLike } = useToggleLike();

  useEffect(() => {
    if (slug) {
      dispatch(fetchArticle(slug));
    }
    return () => {
      dispatch(clearCurrentArticle());
    };
  }, [slug, dispatch]);

  const handleArticleLike = async (id: string) => {
    if (!currentArticle) return;
    await toggleLike('article', id, currentArticle.likesCount, currentArticle.likedBy, (payload) =>
      dispatch(updateArticleLikes(payload))
    );
  };

  if (loading) return <SpinnerLoading className="absolute top-0" />;
  if (error) return <ErrorDisplay errorMessage={error} hasArticlesButton />;

  return (
    <AnimatePresence>
      <AnimationProvider>
        <Container>
          {currentArticle && (
            <>
              <section className="pt-[60px] pb-[20px] md:pt-[100px] md:pb-[30px] xl:pt-[120px] xl:pb-[40px] flex flex-col gap-4 relative">
                <Button
                  onClickFunc={() => navigate(-1)}
                  className="max-w-25 absolute top-10 left-2"
                >
                  <IoIosArrowBack /> Back
                </Button>

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
                        id={currentArticle._id}
                        initialLikesCount={currentArticle.likesCount}
                        toggleLike={handleArticleLike}
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
              </section>
              <CommentSection articleId={currentArticle._id} />
            </>
          )}
        </Container>
      </AnimationProvider>
    </AnimatePresence>
  );
};
