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

interface EditorValues {
  title: string;
  category: string[];
  images?: FileList;
  content: string;
}

const categories = ['technology', 'lifestyle', 'fitness', 'travel'];

export const Editor = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EditorValues>();

  const onSubmit = (data: EditorValues) => {
    console.log('📝 Article submitted:', {
      ...data,
      images: data.images ? Array.from(data.images).map((file) => file) : [],
    });
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

                <Controller
                  name="category"
                  control={control}
                  defaultValue={[]}
                  rules={{
                    validate: (value) =>
                      value.length > 0
                        ? value.length <= 4
                          ? true
                          : 'Maximum 4 categories'
                        : 'Select at least one',
                  }}
                  render={({ field }) => (
                    <CustomSelect
                      name="category"
                      labelText="Select up to 4 categories"
                      options={categories}
                      selected={field.value}
                      onChange={field.onChange}
                      error={errors.category?.message}
                    />
                  )}
                />

                <Controller
                  name="images"
                  control={control}
                  rules={{
                    validate: (files) => {
                      if (!files || files.length === 0) return 'At least one image is required';
                      if (files.length > 4) return 'Maximum 4 images allowed';
                      return true;
                    },
                  }}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <MultipleImagesUploadField
                      labelText="Upload images (max 4)"
                      onChange={(files) => onChange(files || undefined)}
                      value={value || null}
                      error={error?.message}
                    />
                  )}
                />

                <Controller
                  name="content"
                  control={control}
                  defaultValue=""
                  render={({ field }) => <TipTap onChange={field.onChange} />}
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
