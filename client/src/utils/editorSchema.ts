import { z } from 'zod';

export const editorSchema = z.object({
  title: z.string().min(1, 'Title is required'),

  category: z
    .array(z.string())
    .min(1, 'Select at least one category')
    .max(4, 'Maximum 4 categories'),

  images: z
    .custom<FileList>((files) => files instanceof FileList && files.length > 0, {
      message: 'At least one image is required',
    })
    .refine((files) => Array.from(files).every((file) => file.size <= 5 * 1024 * 1024), {
      message: 'Each image must be ≤ 5MB',
    })
    .refine(
      (files) =>
        Array.from(files).every((file) =>
          ['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type)
        ),
      { message: 'Only JPG, PNG, WEBP, or GIF formats allowed' }
    )
    .refine((files) => files.length <= 4, {
      message: 'Maximum 4 images allowed',
    }),

  content: z.string().min(30, 'Article is too short').max(15000, 'Article is too long'),
});

export type EditorValues = z.infer<typeof editorSchema>;
