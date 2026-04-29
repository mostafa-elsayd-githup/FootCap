"use server";
import { revalidatePath } from "next/cache";

export async function addToCartAction(formData) {
  const productData = {
    productId: formData.get("productId"),
    name: formData.get("productName"),
    price: formData.get("price"),
    image: formData.get("image"),
    quantity: 1,
  };

  await fetch("http://localhost:1200/card", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productData),
  });

  revalidatePath("/", "layout"); 
}