import { z } from "zod";

export const feedbackschema = z.object({
  rating: z
    .string()
    .optional()
    .transform((val) => (val === "" || val === undefined ? null : val)),
  intent: z.enum([
    "open_dropdown_action",
    "rating_update",
    "feedback",
  ]),
  comment: z
    .string()
    .optional()
    .transform((val) => (val === "" || val === undefined ? null : val)),
});