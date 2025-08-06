import { FC, useEffect, useState } from 'react';
import { Button } from './Button';
import { CustomTextarea } from './CustomTextarea';
import { createComment } from '../api/apiComments';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { addToast } from '../redux/toast/slice';
import { CommentList } from './CommentList';
import { addNewComment, clearCurrentComments, fetchArticleComments } from '../redux/comment/slice';
import { useForm } from 'react-hook-form';
import { Status } from '../types/apiTypes';
import { FaSpinner } from 'react-icons/fa';

interface CommentSectionProps {
  articleId: string;
}

type CommentValues = {
  content: string;
};

export const CommentSection: FC<CommentSectionProps> = ({ articleId }) => {
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((state) => state.comment);
  const [isCommentUploading, setIsCommentUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CommentValues>({
    defaultValues: {
      content: '',
    },
  });

  const onSubmit = async (data: CommentValues) => {
    try {
      setIsCommentUploading(true);
      const result = await createComment({ articleId, content: data.content });
      if (result.success) {
        dispatch(addToast({ color: 'success', text: 'Comment has been created' }));
        reset();
        dispatch(addNewComment(result.data));
        setIsCommentUploading(false);
        setTimeout(() => dispatch(fetchArticleComments(articleId)), 5000);
      } else {
        dispatch(addToast({ color: 'error', text: result.message }));
      }
    } catch (err) {
      dispatch(addToast({ color: 'error', text: 'Failed to create comment' }));
    }
  };

  useEffect(() => {
    if (articleId) {
      dispatch(fetchArticleComments(articleId));
    }
    return () => {
      dispatch(clearCurrentComments());
    };
  }, [articleId, dispatch]);

  return (
    <section className="flex flex-col gap-4">
      <h3 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold">Comments Below</h3>
      <p className="text-center italic text-sm">
        Share your interesting thoughts about this article with us. <br /> We are looking forward to
        reading your comment.
      </p>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <CustomTextarea
          {...register('content', {
            required: 'Comment content is required',
            validate: (value) => value.trim() !== '' || 'Comment cannot be empty',
          })}
          error={errors.content?.message}
        />

        {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
        <Button
          disabled={isCommentUploading}
          className="md:max-w-[100px] ml-auto md:mr-[12%] mr-0"
          type="submit"
        >
          Send
        </Button>
        <div>
          {isCommentUploading && (
            <FaSpinner className="animate-spin text-2xl text-center mx-auto" />
          )}
        </div>
      </form>
      <CommentList comments={items} />
    </section>
  );
};
