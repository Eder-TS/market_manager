import { z } from "zod";

const userSchema = z.object({
  email: z.string().email("Invalid email!"),
  password: z.string().min(6, "Password must be at last six characters."),
});

export { userSchema };
