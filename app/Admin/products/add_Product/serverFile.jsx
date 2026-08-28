"use server";

import { createClientForServer } from "@/utils/supabase";
import { revalidatePath } from "next/cache";
import {productUpdateSchema } from "@/schemas/add_product_schema"

export default async function EditProduct(prevstate, formdata) {
  const rawData = Object.fromEntries(formdata)
  const parseJsonField = (field) => {
    if (!field) return [];
    if (typeof field === "string") {
      try {
        return JSON.parse(field);
      } catch (e) {
        return [];
      }
    }
    return field;
  };
const product = {
    ...rawData,
    price: rawData.price ? Number(rawData.price) : null,
    oldprice: rawData.oldprice ? Number(rawData.oldprice) : null,
    stock: rawData.stock ? Number(rawData.stock) : null,
    Inventory: rawData.Inventory ? Number(rawData.Inventory) : null,
    quantity: rawData.quantity ? Number(rawData.quantity) : null,
    watchde: rawData.watchde ? Number(rawData.watchde) : null,
    quantity: rawData.quantity ? Number(rawData.quantity) : null,
    sizes: parseJsonField(rawData.sizes),
    colors: parseJsonField(rawData.colors),
    url: parseJsonField(rawData.url),
  };
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

const { id, ...dataToInsert } = cleanedData;

const { data, error: productError } = await supabaseServer
  .from("products")
  .insert([dataToInsert]); 

if (productError) {
  console.error("Supabase Insert Error:", productError);
  return {
    success: false,
    message: "Failed to create product. Please try again later.",
  };
}

revalidatePath("/");
return { success: true, message: "Product created successfully!" };
  } catch (error) {
    console.error("Unexpected Error:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please refresh the page.",
    };
  }
}
