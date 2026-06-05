"use server";

import { createClientForServer } from "@/utils/supabase";
export default async function handleAction(prevstate, formData) {
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
      const supabaseServer = await createClientForServer();
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
