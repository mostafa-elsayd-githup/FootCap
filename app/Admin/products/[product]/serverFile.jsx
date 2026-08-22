"use server";

import { createClientForServer } from "@/utils/supabase";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const productUpdateSchema = z.object({
  id: z.any(),
  type: z.string().optional().nullable(),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional().nullable(),
  price: z.coerce.number({ invalid_type_error: "Price must be a number" }),
  oldprice: z.preprocess(
    (val) => (val === "" || val === undefined ? null : val),
    z.coerce.number().nullable().optional(),
  ),
  stock: z.preprocess(
    (val) => (val === "" || val === undefined ? null : val),
    z.coerce.number().nullable().optional(),
  ),
  Inventory: z
    .preprocess(
      (val) => (val === "" || val === undefined ? null : val),
      z.coerce.number().nullable().optional(),
    )
    .optional(),

  image: z.string().optional().nullable(),
  image_Hover: z.string().optional().nullable(),
  image3: z.string().optional().nullable(),
  image4: z.string().optional().nullable(),
  video: z.string().optional().nullable(),
});

export default async function EditProduct(prevstate, formdata) {
  const product = JSON.parse(formdata.get("product"));

  const validation = productUpdateSchema.safeParse(product);

  if (!validation.success) {
    console.error("Zod Validation Error:", validation.error.format());
    return {
      success: false,
      message:
        "Product data is invalid, please include it from the digital source.",
    };
  }

  const cleanedData = validation.data;

  try {
    const supabaseServer = await createClientForServer();
    const { id, ...dataToUpdata } = cleanedData;

    const { error: productError } = await supabaseServer
      .from("products")
      .update(dataToUpdata)
      .eq("id", id);

    if (productError) {
      console.error("Supabase Update Error:", productError);
      return {
        success: false,
        message: "Failed to update product. Please try again later.",
      };
    }

    revalidatePath("/");
    return { success: true, message: "Product updated successfully!" };
  } catch (error) {
    console.error("Unexpected Error:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please refresh the page.",
    };
  }
}
