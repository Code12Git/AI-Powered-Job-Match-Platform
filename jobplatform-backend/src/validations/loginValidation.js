const z = require('zod')

const loginSchema = z.object({
  email: z.string().email("Invalid email format").trim(),
    password:z.string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .regex(/[A-Z]/, { message: "Password must contain at least 1 uppercase letter" })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, { 
      message: "Password must contain at least 1 special character (e.g., !@#$%^&*)" 
    })
});

module.exports = loginSchema;