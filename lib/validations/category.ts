import { z } from 'zod';

export const createCategorySchema = z.object({
  name: z.string()
    .min(3, 'Category name must be at least 3 characters')
    .max(50, 'Category name must not exceed 50 characters'),
  slug: z.string()
    .min(3, 'Slug must be at least 3 characters')
    .max(50, 'Slug must not exceed 50 characters')
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must not exceed 500 characters')
    .optional()
    .nullable(),
  image: z.string()
    .url('Invalid image URL')
    .optional()
    .nullable(),
});

export const updateCategorySchema = createCategorySchema.partial(); 