const z = require('zod')

const registerSchema = z.object({
  first_name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(50, "Name cannot exceed 50 characters"),
  last_name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(50, "Name cannot exceed 50 characters"),
  username: z
    .string()
    .trim()
    .min(4, "Username must be at least 4 characters")
    .max(20, "Username cannot exceed 20 characters"),
  email: z.string().email("Invalid email format").trim(),
  password: z.string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least 1 special character"),
});


module.exports = registerSchema