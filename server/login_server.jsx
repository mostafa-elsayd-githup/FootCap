"use server";
import { createClientForServer } from "@/utils/supabase";
import { revalidatePath } from "next/cache";
import { ProductSchema } from "@/schemas/productSchema";
export default async function handelAction(prevstate, formData) {
  const dataobject = Object.fromEntries(formData);
  const ProductResult = ProductSchema.safeParse(dataobject);
  const requestId = crypto.randomUUID();
  console.log(dataobject);

  if (!ProductResult.success) {
    return {
      success: false,
      actionType: dataobject.actiontype,
      message: ProductResult.error.flatten().fieldErrors,
      requestId,
    };
  }
  const { id, actiontype, size } = ProductResult.data;

  let supabaseServer = await createClientForServer();
  const { data: getproduct, error: productError } = await supabaseServer
    .from("products")
    .select("*")
    .eq("id", id)
    .single();
  if (!getproduct || productError) {
    return { message: "Product Not Found" };
  }
  let {
    data: { user },
    error: authError,
  } = await supabaseServer.auth.getUser();
  if (authError || !user) {
    return {
      state: 401,
      message: "Please login to continue",
      guestProduct: getproduct,
      type: dataobject.actiontype,
      size: dataobject.size,
    };
  }

  if (actiontype === "card") {
    try {
      const cartitemId = `${id}-${size}`;
      const { data: profile, error: fetchError } = await supabaseServer
        .from("profiles")
        .select("cart")
        .eq("id", user.id)
        .single();
      if (!profile || fetchError) {
        return { error: "Failed to fetch cart" };
      }
      let carts = profile.cart || [];

      const index = carts.findIndex((item) => item.id === cartitemId);
      if (index !== -1) {
        carts[index].quantity += 1;
      } else {
        carts.push({
          ...getproduct,
          id: cartitemId,
          sizes: size,
          quantity: 1,
        });
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
          requestId,
        };
      } else if (index === -1) {
        return {
          cardState: false,
          requestId,
        };
      }
    } catch {
      return { message: "Please Check internet Connect ", status: 500 };
    }
  } else if (actiontype === "wishlist") {
    try {
      const { data: profile, error: fetchError } = await supabaseServer
        .from("profiles")
        .select("wishlist")
        .eq("id", user.id)
        .single();
      if (fetchError) {
        return { error: "Failed to fetch wishlist" };
      }
      let currentWishlist = profile?.wishlist || [];
      const exists = currentWishlist.some((item) => item.id === getproduct.id);
      if (exists) {
        currentWishlist = currentWishlist.filter(
          (item) => item.id !== getproduct.id,
        );
      } else {
        currentWishlist.push(getproduct);
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
      return { wishliststate: !exists, requestId };
    } catch {
      return {
        message: "Sorry, the connection to the server failed.",
        status: 500,
        requestId,
      };
    }
  }
}
