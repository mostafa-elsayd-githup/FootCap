"use server"
import { revalidatePath } from "next/cache";
import { createClientForServer } from "@/utils/supabase";
export default async function handelAction(prevstate, formData) {
  const actionType = formData.get("actiontype");
  const id = formData.get("id");
  const image = formData.get("image");
  const title = formData.get("name");
  const price = formData.get("price");
  const old_price = formData.get("old_price");
  const category = formData.get("category");
  const size = formData.get("size");

  const product = {
    id,
    image,
    title,
    price,
    old_price,
    category,
    size,
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
    const cartitemId = `${product.id}-${size}`;
    if (!size || !size.trim() === "") {
      return { state: true, message: "Select size first" };
    }
    try {
      const { data: profile, error: fetchError } = await supabaseServer
        .from("profiles")
        .select("cart")
        .eq("id", user.id)
        .single();
      if (fetchError) {
        return { error: "Failed to fetch wishlist" };
      }
      if (profile) {
        let carts = profile.cart || [];
        const index = carts.findIndex((item) => item.id === cartitemId);
        if (index !== -1) {
          carts[index].quantity += 1;
        } else {
          carts.push({ ...product, id: cartitemId, quantity: 1 });
        }
        const { error: updateError } = await supabaseServer
          .from("profiles")
          .update({ cart: carts })
          .eq("id", user.id);
        if (updateError) {
          console.error(
            "Error updating wishlist in Supabase:",
            updateError.message,
          );
          return { error: "Failed to update wishlist" };
        }
        if (index !== -1) {
          return {
            cardState: true,
            timeStamp: Date.now(),
          };
        } else if (index === -1) {
          return {
            cardState: false,
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
        currentWishlist = currentWishlist.filter(
          (item) => item.id !== product.id,
        );
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
      return {
        message: "Sorry, the connection to the server failed.",
        status: 500,
      };
    }
  }
}
