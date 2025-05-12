import { z } from 'zod';
import sanitizeHtml from 'sanitize-html';

const sanitizeOptions = {
  allowedTags: [
    'h1',
    'h2',
    'h3',
    'p',
    'strong',
    'em',
    'u',
    's',
    'ul',
    'ol',
    'li',
    'code',
    'pre',
    'br',
  ],
  allowedAttributes: {},
};

export const feedbackSchema = z.object({
  author: z.string().min(1, { message: 'Name is required' }),
  rating: z
    .number()
    .min(1, { message: 'Rating is required' })
    .max(5, { message: 'Rating cannot exceed 5' }),
  post: z
    .string()
    .min(1, { message: 'Feedback is required' })
    .refine((value) => !/^(?:<[^>]+>\s*<\/[^>]+>\s*)+$/.test(value.trim()), {
      message: 'Feedback is required',
    })
    .refine((html) => sanitizeHtml(html, sanitizeOptions) === html, {
      message: 'Feedback contains invalid HTML tags',
    }),
});

export type ValidatedFeedbackRequest = z.infer<typeof feedbackSchema>;
