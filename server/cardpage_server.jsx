"use server";
import { createClientForServer } from "@/utils/supabase";
import { revalidatePath } from "next/cache";

const DeleteCart = async (prevstate, formData) => {
  const actionTypeState = formData.get("intent");
  const id = formData.get("id");
  const supabaseServer = await createClientForServer();
  const {
    data: { user },
    error: userError,
  } = await supabaseServer.auth.getUser();
  if (!user || userError) {
    return {
      state: 401,
      aCtiontype: actionTypeState,
      itemId: id,
      message: "Please log in to continue. Redirecting",
    };
  }
  if (actionTypeState === "delete") {
    const { data: profile, error: userError } = await supabaseServer
      .from("profiles")
      .select("cart")
      .eq("id", user.id)
      .single();

    let cart = profile.cart || [];
    const exiest = cart.some((item) => item.id === Number(id));
    if (exiest) {
      cart = cart.filter((item) => item.id !== Number(id));
    }
    const { error: UpdataError } = await supabaseServer
      .from("profiles")
      .update({ cart: cart })
      .eq("id", user.id);

    if (UpdataError) {
      console.error(
        "Error updating wishlist in Supabase:",
        UpdataError.message,
      );
      return { error: "Failed to update wishlist" };
    }
    revalidatePath("/CardPage");
    return { cardstate: 200, time: Date.now() };
  } else if (actionTypeState === "clear") {
    const { data: profile, errorprofile } = await supabaseServer
      .from("profiles")
      .select("cart")
      .eq("id", user.id)
      .single();
    if (errorprofile) {
      console.error("Error fetching wishlist:", errorprofile.message);
      return { error: "Failed to fetch wishlist" };
    }
    const cartArray = (profile.cart = []);

    const { error: UpdataError } = await supabaseServer
      .from("profiles")
      .update({ cart: cartArray })
      .eq("id", user.id);
    if (UpdataError) {
      console.error(
        "Error updating wishlist in Supabase:",
        UpdataError.message,
      );
      return { error: "Failed to update wishlist" };
    }
    revalidatePath("/CardPage");
    return { Clearcardstate: 200, time: Date.now() };
  }
};
export default DeleteCart;
