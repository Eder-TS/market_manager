import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(3, "Name must be at last three characters."),
  description: z
    .string()
    .min(10, "Description must be at last ten characters."),
  price: z.number().positive("Price must be a positive number."),
  category: z.enum([
    "home",
    "automobiles",
    "electronics",
    "office",
    "construction",
  ]),
});

const productIdSchema = z.object({
  id: z.number().int().positive("Product ID must be a positive integer."),
});

export { productSchema, productIdSchema };
