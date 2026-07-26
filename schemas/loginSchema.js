import { z } from "zod";
export const LoginSchema = z.object({
  email: z
    .string()
    .email({ message: "Write a valid email address." })
    .trim()
    .lowercase(),
  password: z.string().min(10, { message: "The Password muste be 10 or more" }),
});
