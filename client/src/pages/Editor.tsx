import { AnimatePresence } from 'framer-motion';
import { AnimationProvider } from '../components/AnimationProvider';
import { Container } from '../components/Container';
import { PageTitle } from '../components/PageTitle';
import { TextField } from '../components/TextField';
import { useForm, Controller } from 'react-hook-form';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';
import { MultipleImagesUploadField } from '../components/MultiplyImagesUploadField';
import { CustomSelect } from '../components/CustomSelect';

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
    setValue,
    formState: { errors },
  } = useForm<EditorValues>();

  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
    onUpdate({ editor }) {
      const html = editor.getHTML();
      setValue('content', html);
    },
  });

  const onSubmit = (data: EditorValues) => {
    console.log('📝 Article submitted:', {
      ...data,
      images: data.images ? Array.from(data.images).map((file) => file) : [],
    });
  };

  useEffect(() => {
    return () => {
      editor?.destroy();
    };
  }, [editor]);

  return (
    <AnimatePresence>
      <AnimationProvider>
        <Container>
          <section className="py-[60px] md:py-[100px] xl:py-[120px]">
            <div className="flex flex-col w-full">
              <PageTitle>New Article</PageTitle>

              <form
                className="flex flex-col mx-auto gap-4 w-full"
                onSubmit={handleSubmit(onSubmit)}
              >
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
                  rules={{ required: 'Content is required' }}
                  render={({ field }) => (
                    <div className="border border-gray-300 rounded group">
                      <EditorContent editor={editor} className="min-h-[200px] p-2 w-full h-full" />
                    </div>
                  )}
                />
                {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}

                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Publish Article
                </button>
              </form>
            </div>
          </section>
        </Container>
      </AnimationProvider>
    </AnimatePresence>
  );
};
