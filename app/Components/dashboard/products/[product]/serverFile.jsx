"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export default async function EditProduct(prevstate, formdata) {
  const product = formdata.get("product");
  const NewProduct = JSON.parse(product);

  try {
    const res = await fetch(`http://localhost:1200/products/${NewProduct.id}`);
    if (res.ok) {
      await fetch(`http://localhost:1200/products/${NewProduct.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(NewProduct),
      });
    revalidateTag("edit");
    revalidateTag("Running");
    }
  } catch {}
}
