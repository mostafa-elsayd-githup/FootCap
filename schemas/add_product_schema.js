import { z } from "zod";

export const PRODUCT_TYPES_ENUM = [
  "Apparel Set",
  "Ball",
  "Bottle",
  "Cap",
  "Hoodie",
  "Jacket",
  "Pants",
  "Polo Shirt",
  "Racket",
  "Shoes",
  "Shorts",
  "Socks",
  "Sweater",
  "T-Shirt",
  "Towel",
];

export const productUpdateSchema = z.object({
  id: z.any().optional().nullable(),
  
  // تصحيح التكرار: تعريف category مرة واحدة فقط
  category: z.string().min(1, "Category is required"),
  
  type: z.string().optional().nullable(),
  product_type: z
    .enum(PRODUCT_TYPES_ENUM, {
      errorMap: () => ({ message: "Invalid product type selected" }),
    })
    .optional()
    .nullable()
    .or(z.literal("")),

  title: z.string().min(1, "Product title is required"),
  description: z.string().optional().nullable(),

  price: z.preprocess(
    (val) => (val === "" || val === undefined || val === null ? null : Number(val)),
    z
      .number({ invalid_type_error: "Price must be a number" })
      .min(0, "Price is required")
  ),
  oldprice: z.preprocess(
    (val) => (val === "" || val === undefined ? null : Number(val)),
    z.coerce.number().nullable().optional()
  ),
  stock: z.preprocess(
    (val) => (val === "" || val === undefined ? 0 : Number(val)),
    z.coerce.number().nullable().optional()
  ),
  Inventory: z.preprocess(
    (val) => (val === "" || val === undefined ? 0 : Number(val)),
    z.coerce.number().nullable().optional()
  ),
  quantity: z.preprocess(
    (val) => (val === "" || val === undefined ? 0 : Number(val)),
    z.coerce.number().nullable().optional()
  ),
  watchde: z.preprocess(
    (val) => (val === "" || val === undefined ? 0 : Number(val)),
    z.coerce.number().nullable().optional()
  ),

  sizes: z.array(z.string()).optional().default([]),
  colors: z.array(z.string()).or(z.string()).optional().default([]),
  gender: z.string().optional().nullable(),
  made: z.string().optional().nullable(),
  url: z.any().optional().nullable(),
  created_at: z.string().optional().nullable(),
  rating: z.coerce.number().optional().nullable(),

  image: z.string().optional().nullable().or(z.literal("")),
  image_Hover: z.string().optional().nullable().or(z.literal("")),
  image3: z.string().optional().nullable().or(z.literal("")),
  image4: z.string().optional().nullable().or(z.literal("")),
  video: z.string().optional().nullable().or(z.literal("")),
});