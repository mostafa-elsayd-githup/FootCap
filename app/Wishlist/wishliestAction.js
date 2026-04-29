"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
export const handelAction = async (prevstate, formData) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const decryption = jwt.verify(token, process.env.JWT_SECRET);

  const buttonType = formData.get("intent");
  const id = formData.get("id");
  const image = formData.get("image");
  const image_url = formData.get("image_url");
  const name = formData.get("name");
  const price = formData.get("price");
  const old_price = formData.get("old_price");
  const category = formData.get("category");
  const sizes = formData.getAll("sizes");

  const product = {
    id,
    name,
    image,
    image_url,
    price,
    old_price,
    category,
    sizes,
    quantity: 1,
  };

  if (buttonType === "cart") {
    const cartitemId = `${product.id}-${sizes}`;
    const res = await fetch(`http://localhost:1200/users/${decryption.id}`);
    const userdata = await res.json();

    let cart = userdata.cart || [];

    let wishlist = userdata.wishlist || [];
    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) {
      cart.push({ ...product, id: cartitemId });
      wishlist = wishlist.filter((item) => item.id !== product.id);
    }
    await fetch(`http://localhost:1200/users/${decryption.id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ cart: cart, wishlist: wishlist }),
    });
    revalidateTag("navbar");
    if (exists === true) {
    }
  } else if (buttonType === "wishlist") {
    
 try {
      const res = await fetch(`http://localhost:1200/users/${decryption.id}`);
      const user = await res.json();
      if (user) {
        let wishlist = user.wishlist || [];
        const exists = wishlist.some((item) => item.id === product.id);
        
        if (exists) {
          wishlist = wishlist.filter((item) => item.id !== product.id);
        } else {
          return;
        }
        await fetch(`http://localhost:1200/users/${decryption.id}`, {
          method: "PATCH",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ wishlist }),
        });
        revalidateTag("navbar");
        return {wishliststate: exists} 
      }
    }catch{
      
    }
  }
};
