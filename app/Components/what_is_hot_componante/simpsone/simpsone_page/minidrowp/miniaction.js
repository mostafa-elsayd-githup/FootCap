"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
export default async function handelAction(prevstate, formData) {
  // chicking for if he have token or no 
  const tokenstor = await cookies();
  const token = tokenstor.get("token")?.value
  if(!token){
 return{state:401 , message:"Please login to continue"}
}
// 
  const actionType = formData.get("actiontype");
  const id = formData.get("id");
  const image = formData.get("image");
  const name = formData.get("name");
  const price = formData.get("price");
  const old_price = formData.get("old_price");
  const category = formData.get("category");
  const sizes = formData.get("size");
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
  if (actionType === "card") {
    const cartitemId = `${product.id}-${sizes}`;
    if(!sizes || sizes.trim() === ""){
      return{message:"Select size first"}
    }
    try {
      const checkcart = await fetch(`http://localhost:1200/cart/${cartitemId}`);
      if (checkcart.ok) {
        const existingProduct = await checkcart.json();
        const updated = Number(existingProduct.quantity || 0) + 1;
        await fetch(`http://localhost:1200/cart/${cartitemId}`, {
          method: "PATCH",
          body: JSON.stringify({ quantity: updated }),
          headers: { "content-type": "application/json" },
        });
      } else {
        fetch(`http://localhost:1200/cart`, {
          method: "POST",
          body: JSON.stringify({
            ...product,
            id: cartitemId,
            productId: product.id,
            quantity: 1,
          }),
          headers: { "content-type": "application/json" },
        });
      }
      revalidateTag("cart");
    } catch {
      return { message: "عذراً، فشل الاتصال بالسيرفر", status: 500 };
    }
  } else if (actionType === "wishlist") {
    try {
      const chickwishlist = await fetch(
        `http://localhost:1200/wishlist/${product.id}`,
      );
      if (chickwishlist.ok) {
        await fetch(`http://localhost:1200/wishlist/${product.id}`, {
          method: "DELETE",
        });
        revalidateTag("wishlist");
      } else {
        await fetch(`http://localhost:1200/wishlist`, {
          method: "POST",
          body: JSON.stringify(product),
          headers: { "content-type": "application/json" },
        });
        revalidateTag("wishlist");
      }
    } catch {
      return { message: "عذراً، فشل الاتصال بالسيرفر", status: 500 };
    }
  }
}

export async function CheckCookies() {
  const CookiesStore = await cookies();
  const token = CookiesStore.get("token");
  if (!token) {
    return { success: false, message: "login and try agien" };
  }
  return { success: true };
}
