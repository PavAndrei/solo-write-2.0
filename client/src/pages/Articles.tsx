import { AnimatePresence } from 'framer-motion';
import { AnimationProvider } from '../components/AnimationProvider';
import { Container } from '../components/Container';
import { PageTitle } from '../components/PageTitle';
import { ArticlesList } from '../components/ArticlesList';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { useEffect } from 'react';
import { fetchArticles } from '../redux/articles/slice';
import { Categories } from '../components/Categories';
import { ToggleSortButton } from '../components/ToggleSortButton';
import { SpinnerLoading } from '../components/SpinnerLoading';
import ErrorDisplay from '../components/ErrorDisplay';
import { Status } from '../types/apiTypes';
import { CgSpinner } from 'react-icons/cg';
import { Pagination } from '../components/Pagination';
import { setStartIndex } from '../redux/filters/slice';

export const Articles = () => {
  const dispatch = useAppDispatch();

  const { items, lastMonthArticles, totalArticles, status } = useAppSelector(
    (state) => state.article
  );
  const { startIndex, limit, order, categories, searchTerm } = useAppSelector(
    (state) => state.filters
  );

  const handleNextPageClick = () => {
    if (startIndex + 1 + limit < totalArticles) {
      const newStartIndex = startIndex + limit;
      dispatch(setStartIndex(newStartIndex));
    }
  };

  const handlePreviousPageClick = () => {
    if (startIndex + 1 > limit) {
      const newStartIndex = startIndex - limit;
      dispatch(setStartIndex(newStartIndex));
    }
  };

  useEffect(() => {
    dispatch(
      fetchArticles({
        startIndex,
        limit,
        order,
        categories,
        searchTerm,
      })
    );
  }, [startIndex, limit, order, categories, searchTerm]);

  return (
    <AnimatePresence>
      <AnimationProvider>
        <Container>
          <section className="py-[60px] md:py-[100px] xl:py-[120px]">
            <PageTitle>Articles</PageTitle>
            {items && (
              <div className="flex flex-col gap-4 relative">
                <Categories />
                <div className="flex items-center gap-5 flex-wrap">
                  <ToggleSortButton />
                  <div className="flex gap-1 items-center">
                    lastMonthArticles:{' '}
                    {status === Status.LOADING ? (
                      <CgSpinner className="animate-spin" />
                    ) : (
                      lastMonthArticles
                    )}
                  </div>
                  <div className="flex gap-1 items-center">
                    totalArticles:{' '}
                    {status === Status.LOADING ? (
                      <CgSpinner className="animate-spin" />
                    ) : (
                      totalArticles
                    )}
                  </div>
                </div>
                {status === Status.LOADING && <SpinnerLoading />}
                {status === Status.ERROR && <ErrorDisplay errorMessage="Something went wrong..." />}
                {status === Status.SUCCESS && <ArticlesList articles={items} />}
                {status === Status.SUCCESS && (
                  <Pagination
                    totalPages={Math.ceil(totalArticles / limit)}
                    currentPage={(startIndex + limit) / limit}
                    handleNextPage={handleNextPageClick}
                    handlePreviousPage={handlePreviousPageClick}
                  />
                )}
              </div>
            )}
          </section>
        </Container>
      </AnimationProvider>
    </AnimatePresence>
  );
};
