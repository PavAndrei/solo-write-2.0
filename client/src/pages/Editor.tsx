import { AnimatePresence } from 'framer-motion';
import { AnimationProvider } from '../components/AnimationProvider';
import { Container } from '../components/Container';
import { PageTitle } from '../components/PageTitle';
import { TextField } from '../components/TextField';
import { useForm, Controller } from 'react-hook-form';
import { MultipleImagesUploadField } from '../components/MultiplyImagesUploadField';
import { CustomSelect } from '../components/CustomSelect';
import { Button } from '../components/Button';
import { MdSend } from 'react-icons/md';
import { TipTap } from '../components/TipTap';
import { zodResolver } from '@hookform/resolvers/zod';
import { editorSchema, EditorValues } from '../utils/editorSchema';
import { useAppDispatch } from '../redux/store';
import { addToast } from '../redux/toast/slice';
import { createArticle } from '../api/apiArticle';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../constants/categories';

export const Editor = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EditorValues>({
    resolver: zodResolver(editorSchema),
  });

  const onSubmit = async (data: EditorValues) => {
    console.log('📝 Article submitted:', {
      ...data,
      images: Array.from(data.images || []),
    });

    const editorValuesData = data as EditorValues;

    const formData = new FormData();

    formData.append('title', editorValuesData.title);
    formData.append('description', editorValuesData.description);
    editorValuesData.category.forEach((categoryItem) => formData.append('category', categoryItem));
    formData.append('content', editorValuesData.content);
    Array.from(editorValuesData.images).forEach((file) => formData.append('images', file));

    try {
      const result = await createArticle(formData);
      console.log(result);
      if (result.success) {
        dispatch(addToast({ color: 'error', text: 'The Article has been created' }));
        navigate('/profile');
      } else {
        dispatch(addToast({ color: 'error', text: result.message }));
      }
    } catch (err) {
      dispatch(addToast({ color: 'error', text: err }));
      console.error('Registration failed:', err);
    }
  };

  return (
    <AnimatePresence>
      <AnimationProvider>
        <Container>
          <section className="py-[60px] md:py-[100px] xl:py-[120px]">
            <div className="flex flex-col w-full max-w-4xl mx-auto">
              <PageTitle>New Article</PageTitle>

              <form className="flex flex-col gap-6 w-full" onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  labelText="Title"
                  placeholder="Enter article title"
                  type="text"
                  {...register('title', { required: 'Title is required' })}
                  error={errors.title?.message}
                />

                <TextField
                  labelText="Description"
                  placeholder="Enter article description"
                  type="text"
                  {...register('description', { required: 'Description is required' })}
                  error={errors.description?.message}
                />

                <Controller
                  name="category"
                  control={control}
                  defaultValue={[]}
                  render={({ field }) => (
                    <CustomSelect
                      name="category"
                      labelText="Select up to 4 categories"
                      options={CATEGORIES}
                      selected={field.value}
                      onChange={field.onChange}
                      error={errors.category?.message}
                    />
                  )}
                />

                <Controller
                  name="images"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <MultipleImagesUploadField
                      labelText="Upload images (max 4)"
                      onChange={(files) => onChange(files || undefined)}
                      value={value || null}
                      error={errors.images?.message}
                    />
                  )}
                />

                <Controller
                  name="content"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TipTap error={errors.content?.message} onChange={field.onChange} />
                  )}
                />

                <Button
                  type="submit"
                  size="lg"
                  variant="light"
                  className="self-end mt-4 hover:scale-100 hover:translate-y-2 transition-transform duration-300 ease-in-out"
                >
                  Publish an article
                  <MdSend className="ml-2" />
                </Button>
              </form>
            </div>
          </section>
        </Container>
      </AnimationProvider>
    </AnimatePresence>
  );
};
