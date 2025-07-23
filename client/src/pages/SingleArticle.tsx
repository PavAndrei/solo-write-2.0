import { AnimatePresence } from 'framer-motion';
import { AnimationProvider } from '../components/AnimationProvider';
import { Container } from '../components/Container';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Author } from '../types/types';
import { Button } from '../components/Button';
import { IoIosArrowBack } from 'react-icons/io';
import { ImagesSlider } from '../components/ImagesSlider';
import { BiLike } from 'react-icons/bi';
import { GrView } from 'react-icons/gr';

type Article = {
  title: string;
  description: string;
  content: string | TrustedHTML;
  user: Author;
  images: string[];
  likesCount: number;
  viewsCount: number;
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
          <section className="py-[60px] md:py-[100px] xl:py-[120px] flex flex-col gap-4 relative">
            <Button onClickFunc={() => navigate(-1)} className="max-w-25 absolute top-10 left-2">
              <IoIosArrowBack /> Back
            </Button>

            <div
              dangerouslySetInnerHTML={article && { __html: article.content }}
              className="article-container flex flex-col gap-5"
            ></div>

            {article?.images && article?.images.length > 1 ? (
              <ImagesSlider slides={article?.images} />
            ) : (
              <img
                className="w-1/2 self-center object-cover max-h-[500px] rounded-lg"
                src={article?.images[0]}
                alt=""
              />
            )}

            <div className="mt-10 xl:mt-5">
              <div className="flex gap-5 cursor-pointer">
                <div className="flex gap-2 items-center">
                  <BiLike className="text-2xl" /> <span>{article?.likesCount}</span>
                </div>

                <div className="flex gap-2 items-center cursor-pointer">
                  <GrView className="text-2xl" /> <span>{article?.viewsCount}</span>
                </div>
              </div>

              <div className="text-right italic text-md">
                written by{' '}
                <Link
                  to={`/profile/${article?.user._id}`}
                  className="font-bold underline capitalize cursor-pointer"
                >
                  {article?.user.username}
                </Link>
              </div>
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
