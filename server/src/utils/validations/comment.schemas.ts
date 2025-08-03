import { z } from 'zod';

export const commentSchema = z.object({
  content: z
    .string()
    .min(2, 'Comment is too short')
    .max(500, 'Comment is too long'),

  articleId: z.string(),
});

export type CommentInput = z.infer<typeof commentSchema>;
