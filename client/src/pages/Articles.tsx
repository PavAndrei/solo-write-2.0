import { AnimatePresence } from 'framer-motion';
import { AnimationProvider } from '../components/AnimationProvider';
import { Container } from '../components/Container';
import { PageTitle } from '../components/PageTitle';
import { ArticlesList } from '../components/ArticlesList';
import { useEffect, useState } from 'react';

export const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const res = await fetch('http://localhost:5000/api/article/all');

      const data = await res.json();
      setArticles(data.articles);
    };

    fetchArticles();
  }, []);

  console.log(articles);

  return (
    <AnimatePresence>
      <AnimationProvider>
        <Container>
          <section className="py-[60px] md:py-[100px] xl:py-[120px]">
            <PageTitle>Articles</PageTitle>
            {articles && <ArticlesList articles={articles}></ArticlesList>}
          </section>
        </Container>
      </AnimationProvider>
    </AnimatePresence>
  );
};
