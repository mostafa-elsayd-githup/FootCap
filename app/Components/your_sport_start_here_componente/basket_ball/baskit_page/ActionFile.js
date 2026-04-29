"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export default async function handleAction(prevstate, formData) {
  const actionType = formData.get("actiontype");
  const id = formData.get("id");
  const image = formData.get("image");
  const name = formData.get("name");
  const price = formData.get("price");
  const old_price = formData.get("old_price");
  const category = formData.get("category");
  const sizes = formData.get("sizes");
  const product = {
    id,
    image,
    name,
    price,
    old_price,
    category,
    sizes,
    quantity: 1,
  };
 if (actionType === "wishlist") {
  console.log(actionType)
  const tokenstor = await cookies()
  const token = tokenstor.get("token")?.value
  if(!token){
    return{state:401 , message:"Please login to continue"}
  }
    try {
      const wishlist = await fetch(
        `http://localhost:1200/wishlist/${product.id}`,
      );
      if (wishlist.ok) {
        await fetch(`http://localhost:1200/wishlist/${product.id}`, {
          method: "DELETE",
        });

        revalidateTag("wishlist");
      } else {
        await fetch("http://localhost:1200/wishlist", {
          method: "POST",
          body: JSON.stringify(product),
          headers: { "content-type": "application/json" },
        });
        revalidateTag("wishlist");
      }
    } catch {
      return { message: "عذراً، فشل الاتصال بالسيرفر", status: 500 };
    }
  } else if (actionType === "eye") {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    try {
      const res = await fetch(
        `http://localhost:1200/your_sport_start_hear_running/${product.id}`,
      );
      const currentProduct = await res.json();
      const chickTocen = currentProduct.watchedTokens?.includes(token);

      if (chickTocen) return;
      const updataToken = [...(currentProduct.watchedTokens || []), token];
      await fetch(
        `http://localhost:1200/your_sport_start_hear_running/${product.id}`,
        {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            watchde: (currentProduct.watchde || 0) + 1,
            watchedTokens: updataToken,
          }),
        },
      );
    } catch {}
  }
}
