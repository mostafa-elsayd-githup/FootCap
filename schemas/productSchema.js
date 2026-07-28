import { z } from "zod";

export const ProductSchema = z
  .object({
    id: z.string().min(1, { message: "Product ID is required." }),
    actiontype: z.enum(["wishlist", "card"], {
      message: "Invalid action type. Must be wishlist or cart.",
    }),
    size: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.actiontype === "card") {
       return Boolean(data.size && data.size.trim().length > 0);
      }
      return true;
    },
    {
      message: "Please select a size",
      path: ["size"],
    },
  );
export const formSchema = z.object({
  fullName: z
    .string()
    .min(1, { message: "Full Name is required" })
    .min(4, { message: "Full Name must be at least 4 characters" }),
    phone: z
      .string()
      .trim()
      .min(1, { message: "Phone number is required" })
      .regex(/^01[0125][0-9]{8}$/, {
        message:
          "Please enter a valid 11-digit Egyptian phone number (e.g., 010xxxxxxx)",
      }),
  address: z
    .string()
    .trim()
    .min(1, { message: "Detailed Address is required" }),
  city: z.string().trim().min(1, { message: "Please select a city" }),
});
