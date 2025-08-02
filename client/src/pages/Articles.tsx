import { AnimatePresence } from 'framer-motion';
import { AnimationProvider } from '../components/AnimationProvider';
import { Container } from '../components/Container';
import { PageTitle } from '../components/PageTitle';
import { ArticlesList } from '../components/ArticlesList';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { useEffect, useState } from 'react';
import { fetchArticles } from '../redux/articles/slice';
import { Categories } from '../components/Categories';
import { ToggleSortButton } from '../components/ToggleSortButton';
import { SpinnerLoading } from '../components/SpinnerLoading';
import ErrorDisplay from '../components/ErrorDisplay';
import { Status } from '../types/apiTypes';
import { CgSpinner } from 'react-icons/cg';
import { Pagination } from '../components/Pagination';
import { setCategories, setOrder, setSearchTerm, setStartIndex } from '../redux/filters/slice';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const Articles = () => {
  const dispatch = useAppDispatch();

  const [isInitialized, setIsInitialized] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

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

  const handleSelectedPageClick = (num: number) => {
    dispatch(setStartIndex(num * limit));
  };

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());

    if (params.startIndex && +params?.startIndex !== 0) {
      dispatch(setStartIndex(+params.startIndex));
    }

    if (params?.order) {
      dispatch(setOrder(params.order));
    }

    if (params?.categories?.length > 0) {
      dispatch(setCategories(params.categories.split(',')));
    }

    if (params?.searchTerm) {
      dispatch(setSearchTerm(params.searchTerm));
    }

    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) {
      setIsInitialized(true);
      return;
    }

    const query = new URLSearchParams();

    if (startIndex !== 0) query.set('startIndex', String(startIndex));
    if (order === 'asc') query.set('order', order);
    if (categories && categories?.length > 0) query.set('categories', String(categories));
    if (searchTerm) query.set('searchTerm', searchTerm);

    if (query) {
      navigate(`/articles?${query.toString()}`);
    }
  }, [startIndex, limit, order, categories, searchTerm]);

  useEffect(() => {
    if (isInitialized) {
      dispatch(
        fetchArticles({
          startIndex,
          limit,
          order,
          categories,
          searchTerm,
        })
      );
    }
  }, [startIndex, limit, order, categories, searchTerm, isInitialized]);

  const isSuccess = status === Status.SUCCESS;
  const isLoading = status === Status.LOADING;
  const isError = status === Status.ERROR;

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
                    {isLoading ? <CgSpinner className="animate-spin" /> : lastMonthArticles}
                  </div>
                  <div className="flex gap-1 items-center">
                    totalArticles:{' '}
                    {isLoading ? <CgSpinner className="animate-spin" /> : totalArticles}
                  </div>
                </div>
                {isLoading && <SpinnerLoading className="top-1/3" />}
                {isError && <ErrorDisplay errorMessage="Something went wrong..." />}
                {isSuccess && <ArticlesList articles={items} />}
                {isSuccess && totalArticles > limit && (
                  <Pagination
                    totalPages={Math.ceil(totalArticles / limit)}
                    currentPage={(startIndex + limit) / limit}
                    handleNextPage={handleNextPageClick}
                    handlePreviousPage={handlePreviousPageClick}
                    handlePageClick={handleSelectedPageClick}
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
