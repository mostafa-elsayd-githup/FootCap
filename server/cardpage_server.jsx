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
    return { state: 401 };
  }
  if (actionTypeState === "delete") {
    const { data: profile, error: userError } = await supabaseServer
      .from("profiles")
      .select("cart")
      .eq("id", user.id)
      .single();

    let cart = profile.cart || [];

    const exiest = cart.some((item) => item.id === id);

    if (exiest) {
      cart = cart.filter((item) => item.id !== id);
    }
    const { error: UserError } = await supabaseServer
      .from("profiles")
      .update({ cart: cart })
      .eq("id", user.id);

    if (UserError) {
      console.error(
        "Error updating wishlist in Supabase:",
        updateError.message,
      );
      return { error: "Failed to update wishlist" };
    }
    revalidatePath("/");
    return { cardstate: exiest, status: 200, time: Date.now() };
  }
};
export default DeleteCart;
export const clearCart = async (prevstate, formData) => {
  const cookieStors = await cookies();
  const token = cookieStors.get("token")?.value;
  const decryption = jwt.verify(token, process.env.JWT_SECRET);
  const actionTypeState = formData.get("intent");
  if (actionTypeState === "clear") {
    const res = await fetch(`http://localhost:1200/users/${decryption.id}`);
    const userdata = await res.json();
    let cart = userdata.cart || [];
    cart = [];
    await fetch(`http://localhost:1200/users/${decryption.id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ cart }),
    });
    revalidateTag("navbar");
  }
};
