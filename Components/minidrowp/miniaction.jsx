"use server";
import { revalidatePath } from "next/cache";
import { createClientForServer } from "@/utils/supabase";
import { ProductSchema } from "@/schemas/productSchema";
export default async function handelAction(prevstate, formData) {
  const dataobject = Object.fromEntries(formData);
  const ProductResult = ProductSchema.safeParse(dataobject);
  const requestId = crypto.randomUUID();
  if (!ProductResult.success) {
    return {
      success: false,
      actiontype: dataobject.actiontype,
      message: ProductResult.error.flatten().fieldErrors,
      requestId,
    };
  }
  const { id, actiontype, size } = ProductResult.data;
  let supabaseServer = await createClientForServer();
  const { data: product, error: productError } = await supabaseServer
    .from("products")
    .select("*")
    .eq("id", id)
    .single();
  if (!product || productError) {
    return {
      state: 404,
      message: "Product Not Found",
    };
  }
  let {
    data: { user },
    error: authError,
  } = await supabaseServer.auth.getUser();
  if (authError || !user) {
    return {
      state: 401,
      message: "Please login to continue",
      guestProduct: product,
      actiontype: dataobject.actiontype,
      size: dataobject.size,
      requestId,
    };
  }
  if (actiontype === "card") {
    try {
      const { data: product, error: productError } = await supabaseServer
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (productError) {
        console.error(productError);
        return {
          message: `product fetching message :${productError.message}`,
          actiontype: dataobject.actiontype,
          requestId,
        };
      }
      const cartitemId = `${product.id}-${size}`;
      const { data: profile, error: fetchError } = await supabaseServer
        .from("profiles")
        .select("cart")
        .eq("id", user.id)
        .single();
      if (fetchError) {
        return {
          error: "Failed to fetch cart",
          actiontype: dataobject.actiontype,
          requestId,
        };
      }
      let carts = profile.cart || [];
      const index = carts.findIndex((item) => item.id === cartitemId);
      if (index !== -1) {
        carts[index].quantity += 1;
      } else {
        carts.push({ ...product, id: cartitemId, sizes: size, quantity: 1 });
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
          actiontype: "card",
          requestId,
        };
      } else {
        return {
          cardState: false,
          actiontype: "card",
          requestId,
        };
      }
    } catch {
      return { message: "Please Check internet Connect ", status: 500 };
    }
  } else if (actiontype === "wishlist") {
    try {
      const supabaseServer = await createClientForServer();
      const { data: product, error: productErro } = await supabaseServer
        .from("products")
        .select("*")
        .eq("id", id)
        .single();
      if (!product || productErro) {
        return { message: "Product not found" };
      }
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
      return {
        wishliststate: !exists,
        productId: product.id,
        requestId,
      };
    } catch {
      return {
        message: "Sorry, the connection to the server failed.",
        status: 500,
        requestId,
      };
    }
  }
}
