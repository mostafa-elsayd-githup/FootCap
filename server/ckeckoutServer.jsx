"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { revalidateTag } from "next/cache";

export default async function handleOrder(prevstate, formData) {
  const tokenstor = await cookies();
  const token = tokenstor.get("token")?.value;
  if (!token) {
    return { state: 401, message: "Please login to continue" };
  }
  const decryption = jwt.verify(token, process.env.JWT_SECRET);

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

  try {
    const res = await fetch(`http://localhost:1200/users/${decryption.id}`, {
      cache: "no-store",
    });
    const userData = await res.json();

    const updatedOrders = [...(userData.order || []), order];

    const patchRes = await fetch(
      `http://localhost:1200/users/${decryption.id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order: updatedOrders,
          cart: [],
        }),
      },
    );

    if (patchRes.ok) {
      revalidateTag("navbar");
      return { success: true, message: "success", timeStamp: Date.now() };
    }
  } catch {
    console.error("Fetch Error:", error);
    return { inputState: 500, message: "Server Error" };
  }
}
