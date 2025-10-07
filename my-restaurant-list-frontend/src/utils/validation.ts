import { z } from 'zod';
import { RestaurantReadSchema } from '../schemas';

export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    data: dataSchema.optional(),
    message: z.string().optional(),
    error: z.string().optional()
  });

export const RestaurantListResponseSchema = ApiResponseSchema(
  z.array(RestaurantReadSchema)
);

export const RestaurantResponseSchema = ApiResponseSchema(RestaurantReadSchema);

export const RestaurantCreateResponseSchema = ApiResponseSchema(RestaurantReadSchema);

export const RestaurantUpdateResponseSchema = ApiResponseSchema(RestaurantReadSchema);

export const RestaurantDeleteResponseSchema = ApiResponseSchema(
  z.object({ id: z.number() })
);

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
};

export type RestaurantListResponse = z.infer<typeof RestaurantListResponseSchema>;
export type RestaurantResponse = z.infer<typeof RestaurantResponseSchema>;
export type RestaurantCreateResponse = z.infer<typeof RestaurantCreateResponseSchema>;
export type RestaurantUpdateResponse = z.infer<typeof RestaurantUpdateResponseSchema>;
export type RestaurantDeleteResponse = z.infer<typeof RestaurantDeleteResponseSchema>;

// Validation helper functions
export const validateApiResponse = <T extends z.ZodTypeAny>(
  response: unknown,
  schema: z.ZodType<T>
) => {
  return schema.safeParse(response);
};

// Form validation helpers
export const getFieldError = (errors: z.ZodError, fieldName: string): string | undefined => {
  const fieldError = errors.issues.find(issue => 
    issue.path.includes(fieldName)
  );
  return fieldError?.message;
};

export const getAllFieldErrors = (errors: z.ZodError): Record<string, string> => {
  const fieldErrors: Record<string, string> = {};
  errors.issues.forEach(issue => {
    const fieldName = issue.path.join('.');
    fieldErrors[fieldName] = issue.message;
  });
  return fieldErrors;
};
