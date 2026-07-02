"use server";

import { createClientForServer } from "@/utils/supabase";
export default async function handleAction(prevstate, formData) {
  const actionType = formData.get("actiontype");
  const id = formData.get("id");
  let supabaseServer = await createClientForServer();
  let {
    data: { user },
    error: authError,
  } = await supabaseServer.auth.getUser();
  if (authError || !user) {
    return { state: 401, message: "Please login to continue" };
  }

  if (actionType === "wishlist") {
    try {
      const { data: product, error: productError } = await supabaseServer
        .from("products")
        .select("*")
        .eq("id", id)
        .single();
      if (!product || productError) {
        return {
          message: "Prodcut Not Found",
        };
      }
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
      return { wishliststate: !exists, timeStamp: Date.now() };
    } catch {
      return {
        message: "Sorry, the connection to the server failed.",
        status: 500,
      };
    }
  }
}
