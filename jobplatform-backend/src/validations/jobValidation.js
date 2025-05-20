const z = require("zod");

const jobSchema = z
  .object({
    title: z
      .string()
      .min(5, { message: "Title must be at least 5 characters long" })
      .max(50, { message: "Title cannot exceed 50 characters" })
      .trim(),

    description: z
      .string()
      .min(20, { message: "Description must be at least 20 characters long" })
      .max(500, { message: "Description cannot exceed 500 characters" })
      .trim(),
      jobType:z.string(),
    company: z
      .string()
      .min(3, { message: "Company name must be at least 3 characters long" })
      .max(50, { message: "Company name cannot exceed 50 characters" })
      .trim(),

    skills: z
      .array(z.string().min(1, { message: "Skill cannot be empty" }))
      .min(1, { message: "At least one skill is required" })
      .max(15, { message: "Cannot add more than 15 skills" }),

    location: z
      .object({
        city: z
          .string()
          .min(2, { message: "City name must be at least 2 characters long" })
          .max(50, { message: "City name cannot exceed 50 characters" })
          .trim(),
        state: z
          .string()
          .min(2, { message: "State name must be at least 2 characters long" })
          .max(50, { message: "State name cannot exceed 50 characters" })
          .trim(),
        country: z
          .string()
          .min(2, {
            message: "Country name must be at least 2 characters long",
          })
          .max(50, { message: "Country name cannot exceed 50 characters" })
          .trim(),
        postal_code: z
          .string()
          .min(3, { message: "Postal code must be at least 3 characters long" })
          .max(20, { message: "Postal code cannot exceed 20 characters" })
          .trim(),
      })
      .partial(),
  })
  .strict();

module.exports = jobSchema;
