"use server";

import { createClientForServer } from "@/utils/supabase";
import { revalidatePath } from "next/cache";

export default async function EditProduct(prevstate, formdata) {
  const product = JSON.parse(formdata.get("product"));
  try {
    const supabaseServer = await createClientForServer();
    const { id, ...dataToUpdata } = product;
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
    }; }
}
