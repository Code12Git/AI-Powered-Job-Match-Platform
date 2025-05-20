import z from 'zod'

const jobSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  company: z.string().min(3, "Company must be at least 3 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  jobType: z.enum(["full-time", "part-time", "contract", "remote"]),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  location: z.object({
    city: z.string().min(2, "City must be at least 2 characters"),
    state: z.string().min(2, "State must be at least 2 characters"),
    country: z.string().min(2, "Country must be at least 2 characters"),
    postal_code: z.string().min(3, "Postal code must be at least 3 characters"),
  }),
});

export default jobSchema;
