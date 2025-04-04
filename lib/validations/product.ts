import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string()
    .min(3, 'Product name must be at least 3 characters')
    .max(100, 'Product name must not exceed 100 characters'),
  price: z.number()
    .positive('Price must be positive')
    .min(0.01, 'Price must be at least 0.01'),
  images: z.array(z.string())
    .min(1, 'At least one image is required'),
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must not exceed 1000 characters')
    .optional(),
  categoryId: z.string().optional(),
  brand: z.string().optional(),
  processor: z.string().optional(),
  memory: z.string().optional(),
  storage: z.string().optional(),
  model: z.string().optional(),
  display: z.string().optional(),
  // rating: z.number()
  //   .min(0, 'Rating must be between 0 and 5')
  //   .max(5, 'Rating must be between 0 and 5')
  //   .optional(),
  // reviews: z.number()
  //   .int('Reviews count must be an integer')
  //   .min(0, 'Reviews count must be positive')
  //   .optional(),
  isNew: z.boolean().optional(),
  isBestSeller: z.boolean().optional(),
});

export const updateProductSchema = createProductSchema.partial(); 