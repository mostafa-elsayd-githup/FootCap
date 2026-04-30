"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
export default async function handleAction(prevstate, formData) {
  const tokenstor = await cookies();
  const token = tokenstor.get("token")?.value;
  if (!token) {
    return { state: 401, message: "Please login to continue" };
  }
  const decryption = jwt.verify(token, process.env.JWT_SECRET);
  const actionType = formData.get("actiontype");
  const id = formData.get("id");
  const image = formData.get("image");
  const image_Hover = formData.get("image_Hover");
  const image_url = formData.getAll("image_url");
  const image3 = formData.get("image3");
  const video = formData.get("video");
  const image4 = formData.get("image4");
  const name = formData.get("name");
  const price = formData.get("price");
  const old_price = formData.get("old_price");
  const category = formData.get("category");
  const sizes = formData.getAll("sizes");

  const product = {
    id,
    image,
    image_Hover,
    image_url,
    image3,
    video,
    image4,
    name,
    price,
    old_price,
    category,
    sizes,
  };

  if (actionType === "wishlist") {
    try {
      const res = await fetch(`http://localhost:1200/users/${decryption.id}`);
      const user = await res.json();

      if (user) {
        let wishlist = user.wishlist || [];

        const exists = wishlist.some((item) => item.id === product.id);
        // console.log("singel_Component_action", exists);

        if (exists) {
          wishlist = wishlist.filter((item) => item.id !== product.id);
        } else {
          wishlist.push(product);
        }
        await fetch(`http://localhost:1200/users/${decryption.id}`, {
          cache: "no-store",
          method: "PATCH",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ wishlist }),
        });

        revalidateTag("navbar");
        return {wishliststate: !exists} 
      
      }
    } catch {
      return { message: "عذراً، فشل الاتصال بالسيرفر", status: 500 };
    }
  } else if (actionType === "eye") {
    const res = await fetch(
      `http://localhost:1200/your_sport_start_hear_running/${product.id}`,
    );
    const data = await res.json();
    if (data) {
      const UPdataWatched = (data.watchde || 0) + 1;
      await fetch(
        `http://localhost:1200/your_sport_start_hear_running/${product.id}`,
        {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ watchde: UPdataWatched }),
        },
      );
    }
  }
}
