"use server";
import { revalidatePath } from "next/cache";
import { createClientForServer } from "@/utils/supabase";
import { ProductSchema } from "@/schemas/productSchema";

export default async function Wishlist_Action(prevstate, formData) {
  const dataObject = Object.fromEntries(formData);
  const product = ProductSchema.safeParse(dataObject);

  if (!product.success) {
    console.error("Zod Validation Error:", product.error.format());
    return { state: 400, message: "Validation Failed", timeStamp: Date.now() };
  }

  const { id, actiontype } = product.data;

  const supabaseServer = await createClientForServer();
  const {
    data: { user },
    error: authError,
  } = await supabaseServer.auth.getUser();

  if (!user || authError) {
    console.error("Auth Error:", authError.message);
    return {
      state: 401,
      message: "Connection lost. Please check your internet and try again.",
      timeStamp: Date.now(),
    };
  }

  if (actiontype === "wishlist") {
    try {
      const { data: getprodct, error: productError } = await supabaseServer
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (!getprodct || productError) {
        return {
          state: 404,
          message: "Product not found",
          timeStamp: Date.now(),
        };
      }

      const { data: userWishlits, error: fetchError } = await supabaseServer
        .from("profiles")
        .select("wishlist")
        .eq("id", user.id)
        .single();

      if (fetchError) {
        console.error("Error fetching wishlist:", fetchError.message);
        return {
          state: 500,
          message: "Failed to fetch wishlist",
          timeStamp: Date.now(),
        };
      }

      let currentWishlist = userWishlits?.wishlist || [];
      const exists = currentWishlist.some((item) => item.id === getprodct.id);

      if (exists) {
        currentWishlist = currentWishlist.filter(
          (item) => item.id !== getprodct.id,
        );
      } else {
        currentWishlist.push(getprodct);
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
          timeStamp: Date.now(),
        };
      }

      revalidatePath("/Wishlist");

      return {
        state: 200,
        message: "Updated Wishlist successfully",
        timeStamp: Date.now(),
      };
    } catch (error) {
      return {
        state: 500,
        message: "Please Check internet Connection",
        timeStamp: Date.now(),
      };
    }
  }
}
