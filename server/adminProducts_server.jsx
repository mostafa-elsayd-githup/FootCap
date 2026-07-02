"use server";

import { createClientForServer } from "@/utils/supabase";
import { revalidatePath } from "next/cache";

export default async function ProductSHandle(prvstate, formData) {
  const buttontype = formData.get("productType");
  const productId = Number(formData.get("productId"));
  try {
    if (buttontype) {
      const supabaseServer = await createClientForServer();
      const { error: ProductError } = await supabaseServer
        .from("products")
        .delete()
        .eq("id", productId);
      if (ProductError) {
        console.error("Supabase Delete Error:", ProductError);
        return {
          success: false,
          message: "Failed to Delete product. Please try again later.",
        };
      }
      revalidatePath("/");
      return {
        success: true,
        message: "Deleted successfully",
      };
    }
  } catch (error) {
    console.error("Unexpected Error:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please refresh the page.",
    };
  }
}
