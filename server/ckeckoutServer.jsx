"use server";

import { revalidatePath } from "next/cache";
import { createClientForServer } from "@/utils/supabase";
import { formSchema } from "@/schemas/productSchema";
import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handleOrder(prevstate, formData) {
  const dataObject = Object.fromEntries(formData);
  const cheked_data = formSchema.safeParse(dataObject);

  if (!cheked_data.success) {
    console.error("Zod Validation Error:", cheked_data.error.format());
    const fieldErrors = cheked_data.error.flatten().fieldErrors;
    const firstErrorMessage =
      Object.values(fieldErrors)[0]?.[0] || "Validation Failed";

    return {
      state: 400,
      message: firstErrorMessage,
      errors: fieldErrors,
      timeStamp: Date.now(),
    };
  }

  const { FullName, phone, address, city } = cheked_data.data;
  const paymentMethod = formData.get("paymentMethod");
  const stripeToken = formData.get("stripeToken");
  const totalprice = Number(formData.get("totalprice")) || 0;

  let allProducts = [];
  try {
    allProducts = JSON.parse(formData.get("allProducts") || "[]");
  } catch {
    allProducts = [];
  }

  const supabaseServer = await createClientForServer();
  const {
    data: { user },
    error: autheError,
  } = await supabaseServer.auth.getUser();

  if (!user || autheError) {
    return { state: 401, message: "Unauthorized", timeStamp: Date.now() };
  }

  try {
    let paymentDetails = { method: paymentMethod, status: "pending" };

    if (paymentMethod === "card") {
      if (!stripeToken) {
        return {
          state: 400,
          message: "Payment token is missing.",
          timeStamp: Date.now(),
        };
      }
      const secretKey = process.env.STRIPE_SECRET_KEY;
      if (!secretKey) {
        console.error(
          "STRIPE_SECRET_KEY is missing on Vercel Environment Variables",
        );
        return {
          state: 500,
          message: "Payment server configuration error.",
          timeStamp: Date.now(),
        };
      }
      const stripe = new Stripe(secretKey);
      const charge = await stripe.charges.create({
        amount: Math.round(totalprice * 100),
        currency: "egp",
        source: stripeToken,
        description: `Order for ${FullName}`,
      });

      paymentDetails = {
        method: "card",
        status: "paid",
        chargeId: charge.id,
      };
    } else if (paymentMethod === "cash") {
      paymentDetails = {
        method: "cash",
        status: "cash_on_delivery",
      };
    }
    const order = {
      id: Date.now().toString(),
      fullName: FullName,
      phone,
      address,
      city,
      totalprice,
      products: allProducts,
      payment: paymentDetails,
      createdAt: new Date().toISOString(),
    };

    const { data: profile, error: profileError } = await supabaseServer
      .from("profiles")
      .select("orders")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      console.error("Error fetching profile:", profileError?.message);
      return { state: 400, message: "Failed to fetch user profile" };
    }

    const updatedOrders = [...(profile.orders || []), order];

    const { error: updateError } = await supabaseServer
      .from("profiles")
      .update({
        orders: updatedOrders,
        cart: [],
      })
      .eq("id", user.id);

    if (updateError) {
      console.error("Error updating profile in Supabase:", updateError.message);
      return { state: 500, message: "Failed to save order in database" };
    }

    revalidatePath("/CardPage");
    return {
      success: true,
      message: "Order placed successfully!",
      timeStamp: Date.now(),
    };
  } catch (error) {
    console.error("Order Processing Error:", error);
    return {
      state: 500,
      message: error.message || "Server Error, please try again later.",
      timeStamp: Date.now(),
    };
  }
}
