"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export default async function handelAction(prevstate, formData) {
  const tokenStore = await cookies();
  const token = tokenStore.get("token")?.value;
  const decryption = jwt.verify(token, process.env.JWT_SECRET);

  if (!token) {
    return { state: 401, message: "please Login To continue" };
  }
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
    if (!sizes || sizes.trim() === "") {
      return { sizemessage: "Select size first" };
    }
    try {
      const checkuser = await fetch(
        `http://localhost:1200/users/${decryption.id}`,
      );
      const cartdata = await checkuser.json();
      if (cartdata) {
        let carts = cartdata.cart || [];
        let wishlist = cartdata.wishlist || [];

        const index = carts.findIndex((item) => item.id === cartitemId);
        wishlist = wishlist.filter((item) => item.id !== product.id);
        if (index !== -1) {
          carts[index].quantity += 1;
        } else {
          carts.push({ ...product, id: cartitemId, quantity: 1 });
        }
        await fetch(`http://localhost:1200/users/${decryption.id}`, {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ cart: carts, wishlist }),
        });
        revalidateTag("navbar");
        if (index !== -1) {
          return {
            cardState: true,
            type: "quantity",
            timeStamp: Date.now(),
          };
        } else if (index === -1) {
          return {
            cardState: false,
            type: "add",
            timeStamp: Date.now(),
          };
        }
      }
    } catch {
      return { message: "Please Check internet Connect ", status: 500 };
    }
  }
  //  else if (actionType === "wishlist") {
  //   try {
  //     const res = await fetch(`http://localhost:1200/users/${decryption.id}`);
  //     const user = await res.json();
  //     if (user) {
  //       let wishlist = user.wishlist || [];

  //       const exists = wishlist.some((item) => item.id === product.id);

  //       if (exists) {
  //         wishlist = wishlist.filter((item) => item.id !== product.id);
  //       } else {
  //         wishlist.push(product);
  //       }
  //       await fetch(`http://localhost:1200/users/${decryption.id}`, {
  //         method: "PATCH",
  //         headers: { "Content-type": "application/json" },
  //         body: JSON.stringify({ wishlist }),
  //       });
  //     }
  //     revalidateTag("navbar");
  //   } catch {
  //     return { message: "عذراً، فشل الاتصال بالسيرفر", status: 500 };
  //   }
  // }
  else if (actionType === "wishlist") {
    try {
      const res = await fetch(`http://localhost:1200/users/${decryption.id}`);
      const user = await res.json();

      if (!user) {
        return { state: 404, message: "User not found" };
      }

      let wishlist = user.wishlist || [];

      const exists = wishlist.some((item) => item.id === product.id);

      let newWishlistState;

      if (exists) {
        wishlist = wishlist.filter((item) => item.id !== product.id);
        newWishlistState = false;
      } else {
        wishlist.push(product);
        newWishlistState = true;
      }

      await fetch(`http://localhost:1200/users/${decryption.id}`, {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ wishlist }),
      });

      revalidateTag("navbar");

      return {
        wishliststate: newWishlistState,
        wishlistmessage: newWishlistState
          ? "Added to Wishlist"
          : "Removed from Wishlist",
        state: 200,
      };
    } catch (error) {
      console.error("Wishlist Error:", error);
      return { message: "Connection failed with server", status: 500 };
    }
  }
}
