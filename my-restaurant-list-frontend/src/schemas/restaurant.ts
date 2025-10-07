import { z } from 'zod';

// Price range enum
export const PriceRangeSchema = z.enum(['$', '$$', '$$$']);

// Base restaurant schema
export const RestaurantBaseSchema = z.object({
  name: z.string()
    .min(1, 'Restaurant name is required')
    .max(120, 'Restaurant name must be 120 characters or less'),
  type: z.string()
    .min(1, 'Cuisine type is required')
    .max(80, 'Cuisine type must be 80 characters or less'),
  image: z.string()
    .min(5, 'Image URL must be at least 5 characters')
    .url('Must be a valid URL'),
  location: z.string()
    .min(1, 'Location is required')
    .max(80, 'Location must be 80 characters or less'),
  rating: z.number()
    .int('Rating must be a whole number')
    .min(0, 'Rating must be at least 0')
    .max(5, 'Rating must be at most 5'),
  description: z.string()
    .max(400, 'Description must be 400 characters or less')
    .optional(),
  priceRange: PriceRangeSchema
});

// Schema for creating a new restaurant
export const RestaurantCreateSchema = RestaurantBaseSchema;

// Schema for updating a restaurant
export const RestaurantUpdateSchema = z.object({
  name: z.string()
    .min(1, 'Restaurant name must be at least 1 character')
    .max(120, 'Restaurant name must be 120 characters or less')
    .optional(),
  type: z.string()
    .min(1, 'Cuisine type must be at least 1 character')
    .max(80, 'Cuisine type must be 80 characters or less')
    .optional(),
  image: z.string()
    .min(5, 'Image URL must be at least 5 characters')
    .url('Must be a valid URL')
    .optional(),
  location: z.string()
    .min(1, 'Location must be at least 1 character')
    .max(80, 'Location must be 80 characters or less')
    .optional(),
  rating: z.number()
    .int('Rating must be a whole number')
    .min(0, 'Rating must be at least 0')
    .max(5, 'Rating must be at most 5')
    .optional(),
  description: z.string()
    .max(400, 'Description must be 400 characters or less')
    .optional(),
  priceRange: PriceRangeSchema.optional()
});

// Schema for reading restaurant data
export const RestaurantReadSchema = RestaurantBaseSchema.extend({
  id: z.number().int().positive('ID must be a positive integer')
});

export type PriceRange = z.infer<typeof PriceRangeSchema>;
export type RestaurantBase = z.infer<typeof RestaurantBaseSchema>;
export type RestaurantCreate = z.infer<typeof RestaurantCreateSchema>;
export type RestaurantUpdate = z.infer<typeof RestaurantUpdateSchema>;
export type RestaurantRead = z.infer<typeof RestaurantReadSchema>;

// Util for validation
export const validateRestaurantCreate = (data: unknown) => {
  return RestaurantCreateSchema.safeParse(data);
};

export const validateRestaurantUpdate = (data: unknown) => {
  return RestaurantUpdateSchema.safeParse(data);
};

export const validateRestaurantRead = (data: unknown) => {
  return RestaurantReadSchema.safeParse(data);
};

// Form validation schemas
export const RestaurantFormSchema = RestaurantBaseSchema.extend({
  rating: z.number()
    .int('Rating must be a whole number')
    .min(0, 'Rating must be at least 0')
    .max(5, 'Rating must be at most 5'),
  image: z.string()
    .min(1, 'Image URL is required')
    .url('Please enter a valid image URL')
});

export type RestaurantForm = z.infer<typeof RestaurantFormSchema>;
