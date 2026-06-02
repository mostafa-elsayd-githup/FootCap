"use server";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { createClientForServer } from "@/utils/supabase";
export default async function handelAction(prevstate, formData) {
 const supabaseServer = await createClientForServer();
  const { data: {user}, error: authError } = await supabaseServer.auth.getUser();
  if (authError || !user) {
    return { state: 401, message: "Please login to continue" };
  }


  const actionType = formData.get("actiontype");
  const id = formData.get("id");
  const image = formData.get("image");
  const name = formData.get("name");
  const price = formData.get("price");
  const old_price = formData.get("old_price");
  const category = formData.get("category");
  const size = formData.get("size");

  const product = {
    id,
    image,
    name,
    price,
    old_price,
    category,
    size,
    quantity: 1,
  };

  if (actionType === "card") {
    const cartitemId = `${product.id}-${size}`;
    if (!size || !size.trim() === "") {
      return { state: true, message: "Select size first" };
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
        // revalidateTag("navbar");
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
  } else if (actionType === "wishlist") {
 try {
      const supabaseServer = await createClientForServer();
      const { data: profile, error: fetchError } = await supabaseServer
      .from("profiles")
      .select("wishlist")
      .eq("id", user.id)
      .single();
      if (fetchError) {
        console.error("Error fetching wishlist:", fetchError.message);
        return { error: "Failed to fetch wishlist" };
      }
      let currentWishlist = profile?.wishlist || [];
      const exists = currentWishlist.some((item) => item.id === product.id);
      if (exists) {
        currentWishlist = currentWishlist.filter((item) => item.id !== product.id);
      } else {
        currentWishlist.push(product);
      }
      const { error: updateError } = await supabaseServer
        .from("profiles")
        .update({ wishlist: currentWishlist }) 
        .eq("id", user.id);
      if (updateError) {
        console.error(
          "Error updating wishlist in Supabase:",
          updateError.message,
        );
        return { error: "Failed to update wishlist" };
      }
      revalidatePath("/", "layout");
      return { wishliststate: !exists, timeStamp: Date.now() };
    } catch {
      return { message: "Sorry, the connection to the server failed.", status: 500 };
    }
  }
}
