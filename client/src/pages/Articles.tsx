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

export const Articles = () => {
  const dispatch = useAppDispatch();

  const { items, status } = useAppSelector((state) => state.article);
  const { startIndex, limit, order, category, searchTerm } = useAppSelector(
    (state) => state.filters
  );

  useEffect(() => {
    dispatch(
      fetchArticles({
        startIndex,
        limit,
        order,
        category,
        searchTerm,
      })
    );
  }, []);

  if (status === 'loading') {
    return <SpinnerLoading />;
  }

  if (status === 'error') {
    return <ErrorDisplay errorMessage="Something went wrong..." />;
  }

  return (
    <AnimatePresence>
      <AnimationProvider>
        <Container>
          <section className="py-[60px] md:py-[100px] xl:py-[120px]">
            <PageTitle>Articles</PageTitle>

            <div className="flex flex-col gap-3">
              {items && (
                <>
                  <Categories />
                  <ToggleSortButton />
                  <ArticlesList articles={items} />
                </>
              )}
            </div>
          </section>
        </Container>
      </AnimationProvider>
    </AnimatePresence>
  );
};
