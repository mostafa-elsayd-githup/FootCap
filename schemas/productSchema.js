import { z } from "zod";

export const ProductSchema = z.object({
  id: z.string().min(1, { message: "Product ID is required." }),
  actiontype: z.enum(["wishlist", "card"], {
    message: "Invalid action type. Must be wishlist or cart.",
  }),
  size: z.string().optional(), 
}).refine((data) => {
  if (data.actiontype === "card") {
    return data.size !== undefined && data.size.trim().length > 0;
  }
  return true; 
}, {
  message: "Please select a size",
  path: ["size"], 
});