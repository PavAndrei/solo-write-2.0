import { z } from 'zod';

export const editorSchema = z.object({
  title: z.string().min(1, 'Title is required'),

  category: z
    .array(z.string())
    .min(1, 'Select at least one category')
    .max(4, 'Maximum 4 categories'),

  content: z
    .string()
    .min(30, 'Article is too short')
    .max(15000, 'Article is too long'),
});

export type EditorValues = z.infer<typeof editorSchema>;
