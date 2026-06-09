"use server";
import { revalidatePath } from "next/cache";
import { createClientForServer } from "@/utils/supabase";
export const handelAction = async (prevstate, formData) => {
  const buttonType = formData.get("buttontype");
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
  const supabaseServer = await createClientForServer();
  const {
    data: { user },
    error: authError,
  } = await supabaseServer.auth.getUser();
  if (!user || authError) {
    return { state: 401, message: "Please login to continue" };
  }
  if (buttonType === "wishlist") {
    try {
      const supabaseServer = await createClientForServer();
      const { data: userWishlits, error: fetchError } = await supabaseServer
        .from("profiles")
        .select("wishlist")
        .eq("id", user.id)
        .single();
      if (fetchError) {
        console.error("Error fetching wishlist:", fetchError.message);
        return { error: "Failed to fetch wishlist" };
      }
      let currentWishlist = userWishlits?.wishlist || [];
      const exists = currentWishlist.some((item) => item.id === product.id);
      if (exists) {
        currentWishlist = currentWishlist.filter(
          (item) => item.id !== product.id,
        );
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
      revalidatePath("/");
      return { wishliststate: !exists, status: 200, timeStamp: Date.now() };
    } catch (error) {
      return { message: "Please Check internet Connect ", status: 500 };
    }
  }
};
