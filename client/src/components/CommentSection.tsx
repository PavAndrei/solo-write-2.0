import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { Button } from './Button';
import { CustomTextarea } from './CustomTextarea';
import { createComment, getArticleComments } from '../api/apiComments';
import { useAppDispatch } from '../redux/store';
import { addToast } from '../redux/toast/slice';
import { CommentList } from './CommentList';
import { Comment } from '../types/types';

interface CommentSectionProps {
  articleId: string;
}

export const CommentSection: FC<CommentSectionProps> = ({ articleId }) => {
  const [formData, setFormData] = useState('');
  const [comments, setComments] = useState<Comment[] | undefined>([]);

  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await createComment({ articleId, content: formData });
      console.log(result);
      if (result.success) {
        dispatch(addToast({ color: 'error', text: 'The comment has been created' }));
      } else {
        dispatch(addToast({ color: 'error', text: result.message }));
      }

      setFormData('');
    } catch (err) {
      dispatch(addToast({ color: 'error', text: err }));
      console.error('Creating a comment failed:', err);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      const comments = await getArticleComments(articleId);
      if (comments) {
        setComments(comments.data);
      }
    };

    getComments();
  }, [articleId]);

  return (
    <section className="flex flex-col gap-4">
      <h3 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold">Comments Below</h3>
      <p className="text-center italic text-sm">
        Share your interesting thoughts about this article with us. <br /> We are looking forward to
        reading your comment.
      </p>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <CustomTextarea value={formData} onChange={handleChange} />
        <Button className="md:max-w-[100px] ml-auto md:mr-[12%] mr-0" type="submit">
          Send
        </Button>
        <CommentList comments={comments} />
      </form>
    </section>
  );
};
