"use server";

import { createClientForServer } from "@/utils/supabase";

export default async function handleAction(prevstate, formData) {
  const actionType = formData.get("actiontype");
  const id = formData.get("id");
  const supabaseServer = await createClientForServer();

  if (actionType === "wishlist") {
    try {
      const { data: product, error: productError } = await supabaseServer
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (!product || productError) {
        return {
          state: 404,
          message: "Product Not Found",
          wishliststate: null,
        };
      }

      const {
        data: { user },
        error: authError,
      } = await supabaseServer.auth.getUser();
      if (authError || !user) {
        return {
          state: 201,
          gurstproduct: product,
          message: "Login Required",
          wishliststate: true,
        };
      }

      const { data: profile, error: fetchError } = await supabaseServer
        .from("profiles")
        .select("wishlist")
        .eq("id", user.id)
        .single();

      if (fetchError) {
        return {
          state: 400,
          message: "Failed to fetch wishlist",
          wishliststate: null,
        };
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
        return {
          state: 500,
          message: "Failed to update wishlist",
          wishliststate: null,
        };
      }

      return {
        state: 200,
        wishliststate: !exists,
        message: "Success",
      };
    } catch (error) {
      console.error("Catch Error:", error);
      return {
        state: 500,
        message: "Sorry, the connection to the server failed.",
        wishliststate: null,
      };
    }
  }
  return { state: null, message: "", wishliststate: null };
}
