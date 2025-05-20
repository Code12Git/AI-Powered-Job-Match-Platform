const z = require('zod');

const workSchema = z.object({
  job_title: z.string().min(1, "Job title is required"),
  company: z.string().min(1, "Company name is required"),
  start_date: z.coerce.date({
    required_error: "Start date is required",
    invalid_type_error: "Invalid date format",
  }),
  end_date: z.coerce.date().optional(),
  current: z.boolean().default(false),
  description: z.string().optional(),
});

const skillSchema = z.object({
  name: z.string().trim().min(1, "Skill name is required"),
  proficiency: z.enum(["beginner", "intermediate", "advanced"]).default("intermediate"),
});

const locationSchema = z.object({
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  postal_code: z.string().optional(),
});

const profileSchema = z.object({
  user: z.string().refine(val => mongoose.Types.ObjectId.isValid(val)),
  skills: z.array(skillSchema).min(1, "At least one skill is required"),
  location: locationSchema.optional(),
  experience: z.array(workSchema).optional(),
});

// For creating new profile
const createProfileSchema = profileSchema.omit({ user: true });

// For updating profile
const updateProfileSchema = profileSchema.partial();

module.exports = {
  profileSchema,
  createProfileSchema,
  updateProfileSchema,
  workSchema,
  skillSchema,
  locationSchema
};