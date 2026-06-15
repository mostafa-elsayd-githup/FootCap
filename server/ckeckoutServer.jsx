"use server";

import { revalidatePath } from "next/cache";
import { createClientForServer } from "@/utils/supabase";

export default async function handleOrder(prevstate, formData) {
  const fullName = formData.get("fullName");
  const address = formData.get("address");
  const phone = formData.get("phone");
  const city = formData.get("city");
  const card = formData.get("card");
  const totalprice = formData.get("totalprice");
  const allProducts = formData.getAll("allProducts");

  const isInvalid =
    !fullName.trim() || !address.trim() || !phone.trim() || !city || !card;
  if (isInvalid)
    return {
      inputState: 100,
      timeStamp: Date.now(),
      message: "Please fill all fields",
    };
  const phoneHasLetters = /\D/.test(phone.replace(/\s/g, ""));
  if (phoneHasLetters) {
    return {
      inputState: 101,
      timeStamp: Date.now(),
      message: "Phone must contain numbers only",
    };
  }
  const cardNumbersOnly = card.replace(/\s/g, "");
  const cardHasLetters = /\D/.test(cardNumbersOnly);
  if (cardHasLetters) {
    return {
      inputState: 102,
      timeStamp: Date.now(),
      message: "Card must contain numbers only",
    };
  }
  if (cardNumbersOnly.length < 16) {
    return {
      inputState: 103,
      timeStamp: Date.now(),
      message: "Card must be 16 Digits",
    };
  }
  const order = {
    id: Date.now().toString(),
    fullName,
    phone,
    address,
    city,
    card,
    createdAt: new Date().toISOString(),
    products: allProducts,
    totalprice: totalprice,
  };
  const supabaseServer = await createClientForServer();
  const {
    data: { user },
    error: autheError,
  } = await supabaseServer.auth.getUser();
  if (!user || autheError) {
    return [];
  }
  try {
    const { data: profile, error: profileError } = await supabaseServer
      .from("profiles")
      .select("*")
      .eq("id", user.id);
    if (profileError || !profile || profile.length === 0) {
      console.error("Error fetching wishlist:", profileError.message);
      return { error: "Failed to fetch wishlist" };
    }

    let updatedOrders = profile[0].orders || [];

    updatedOrders.push(order);

    const { error: UpdataError } = await supabaseServer
      .from("profiles")
      .update({
        orders: updatedOrders,
        cart: [],
      })
      .eq("id", user.id);
    if (UpdataError) {
      console.error(
        "Error updating wishlist in Supabase:",
        UpdataError.message,
      );
      return { error: "Failed to update wishlist" };
    }
    revalidatePath("/CardPage");
    return { success: true, message: "success", timeStamp: Date.now() };
  } catch {
    console.error("Fetch Error:", error);
    return { inputState: 500, message: "Server Error" };
  }
}
