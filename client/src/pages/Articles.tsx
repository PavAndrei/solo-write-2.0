import { AnimatePresence } from 'framer-motion';
import { AnimationProvider } from '../components/AnimationProvider';
import { Container } from '../components/Container';
import { PageTitle } from '../components/PageTitle';
import { ArticlesList } from '../components/ArticlesList';
import { getAllArticles } from '../api/apiArticle';
import { useFetch } from '../hooks/useFetch';

export const Articles = () => {
  const { data, error, isLoading } = useFetch(getAllArticles);

  console.log(data);

  return (
    <AnimatePresence>
      <AnimationProvider>
        <Container>
          <section className="py-[60px] md:py-[100px] xl:py-[120px]">
            <PageTitle>Articles</PageTitle>
            <ArticlesList articles={data?.articles} />
          </section>
        </Container>
      </AnimationProvider>
    </AnimatePresence>
  );
};
