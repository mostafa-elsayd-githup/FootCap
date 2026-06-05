"use server";
import { createClientForServer } from "@/utils/supabase";

export default async function handelAction(prevstate, formData) {
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
  let supabaseServer = await createClientForServer();
  let {
    data: { user },
    error: authError,
  } = await supabaseServer.auth.getUser();
  if (authError || !user) {
    return { state: 401, message: "Please login to continue" };
  }
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
      // console.log("step 1");
      const { data: profile, error: fetchError } = await supabaseServer
        .from("profiles")
        .select("wishlist")
        .eq("id", user.id)
        .single();
      if (fetchError) {
        return { error: "Failed to fetch wishlist" };
      }
      let currentWishlist = profile?.wishlist || [];
      const exists = currentWishlist.some((item) => item.id === product.id);
      // console.log("step 2");
      if (exists) {
        currentWishlist = currentWishlist.filter(
          (item) => item.id !== product.id,
        );
      } else {
        currentWishlist.push(product);
      }
      // console.log("step 3");
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
 
      
      return { wishliststate: !exists, timeStamp: Date.now() };
      revalidatePath("/", "layout");
    } catch {
      return {
        message: "Sorry, the connection to the server failed.",
        status: 500,
      };
    }
  }
}
