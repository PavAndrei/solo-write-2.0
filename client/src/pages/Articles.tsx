import { AnimatePresence } from 'framer-motion';
import { AnimationProvider } from '../components/AnimationProvider';
import { Container } from '../components/Container';
import { PageTitle } from '../components/PageTitle';
import { ArticlesList } from '../components/ArticlesList';

const arr = [
  {
    _id: '1',
    title: 'title-1',
    category: ['lifestyle'],
    imagesPaths: [],
    content: 'content-1',
  },
  {
    _id: '2',
    title: 'title-2',
    category: ['technology'],
    imagesPaths: [],
    content: 'content-2',
  },
  {
    _id: '3',
    title: 'title-3',
    category: ['fitness'],
    imagesPaths: [],
    content: 'content-3',
  },
];

export const Articles = () => {
  return (
    <AnimatePresence>
      <AnimationProvider>
        <Container>
          <section className="py-[60px] md:py-[100px] xl:py-[120px]">
            <PageTitle>Articles</PageTitle>
            <ArticlesList articles={arr} />
          </section>
        </Container>
      </AnimationProvider>
    </AnimatePresence>
  );
};
