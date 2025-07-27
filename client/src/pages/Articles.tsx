import { AnimatePresence } from 'framer-motion';
import { AnimationProvider } from '../components/AnimationProvider';
import { Container } from '../components/Container';
import { PageTitle } from '../components/PageTitle';
import { ArticlesList } from '../components/ArticlesList';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { useEffect } from 'react';
import { fetchArticles } from '../redux/articles/slice';

export const Articles = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.article);

  useEffect(() => {
    dispatch(fetchArticles());
  }, []);

  return (
    <AnimatePresence>
      <AnimationProvider>
        <Container>
          <section className="py-[60px] md:py-[100px] xl:py-[120px]">
            <PageTitle>Articles</PageTitle>
            {items && <ArticlesList articles={items} />}
          </section>
        </Container>
      </AnimationProvider>
    </AnimatePresence>
  );
};
