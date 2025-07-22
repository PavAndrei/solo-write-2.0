import { AnimatePresence } from 'framer-motion';
import { AnimationProvider } from '../components/AnimationProvider';
import { Container } from '../components/Container';
import { PageTitle } from '../components/PageTitle';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Author } from '../types/types';
import { Button } from '../components/Button';
import { IoIosArrowBack } from 'react-icons/io';

type Article = {
  title: string;
  description: string;
  content: string | TrustedHTML;
  user: Author;
};

export const SingleArticle = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState<Article>();

  useEffect(() => {
    const fetchOneArticle = async () => {
      const res = await fetch(`http://localhost:5000/api/article/${slug}`);
      const data = await res.json();
      setArticle(data.data);
    };

    fetchOneArticle();
  }, []);

  console.log(article);

  return (
    <AnimatePresence>
      <AnimationProvider>
        <Container>
          <section className="py-[60px] md:py-[100px] xl:py-[120px] flex flex-col gap-4">
            <PageTitle>{article?.title}</PageTitle>
            <p className="indent-5 md:indent-10 italic text-sm max-w-1/3 text-right self-end">
              {article?.description}
            </p>

            <div
              dangerouslySetInnerHTML={article && { __html: article.content }}
              className="article-container flex flex-col gap-2"
            ></div>
            <div className="text-right italic text-md">
              written by{' '}
              <Link
                to={`/profile/${article?.user._id}`}
                className="font-bold underline capitalize cursor-pointer "
              >
                {article?.user.username}
              </Link>
            </div>
            <Button onClickFunc={() => navigate(-1)} className="max-w-25">
              <IoIosArrowBack /> Back
            </Button>
          </section>
        </Container>
      </AnimationProvider>
    </AnimatePresence>
  );
};
