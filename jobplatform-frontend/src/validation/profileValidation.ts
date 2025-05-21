import { z } from 'zod';

 const jobTypes = ['remote', 'full-time', 'onsite', 'any', 'part-time', 'contract'] as const;

 const locationSchema = z.object({
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),
  postal_code: z.string().min(3, "Postal code must be at least 3 characters")
});

 export const profileSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name can't be longer than 50 characters"),
  location: locationSchema,
  experience: z.enum(['0-1', '1-3', '3-5', '5+']),
  skills: z.array(z.string())
    .min(1, "Select at least one skill")
    .max(10, "You can select up to 10 skills"),
    jobType: z.enum(jobTypes)
});

 export type ProfileFormData = z.infer<typeof profileSchema>;