import { z } from "zod";

const nameRegex = /^[a-zA-Z\u0600-\u06FF\s]+$/;
export const registerSchema = z.object({
  name: z
    .string()
    .min(10, { message: "The name must be 10 letters or more" })
    .regex(nameRegex, {
      message: "The name must contain letters only (no numbers or symbols)",
    }),

  email: z
    .string()
    .email({ message: "Write a valid email address." })
    .trim()
    .lowercase(),
  password: z
    .string()
    .min(20,{ message: "The password must consist of 20 hacters." }),
});
