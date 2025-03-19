import { z } from "zod";

const userSchema = z.object({
  email: z.string().email("Invalid email!"),
  password: z.string().min(6, "Password must be at last six characters."),
});

const userIdSchema = z.object({
  id: z.number().int().positive("User ID must be a positive integer."),
});

export { userSchema, userIdSchema };
