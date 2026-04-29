"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";


export default async function handleOrder(prevstate, formData) {
  const tokenstor = await cookies();
  const token = tokenstor.get("token")?.value;  
  if (!token) {
    return { state: 401, message: "Please login to continue" };
  }
  const decryption = jwt.verify(token, process.env.JWT_SECRET);
  const fullName = formData.getAll("fullName");
  const address = formData.getAll("address");
  const phone = formData.get("phone");
  const city = formData.get("city");
  const card = formData.get("card");
  const allProducts = formData.get("allProducts");

  
  const ActionTypeState = formData.get("ActionTypeState");

  if ((!fullName || !address, !phone, !city, !card))
    return { inputState: 100, message: "empty input" };
  const order = {
    fullName,
    phone,
    address,
    city,
    card,
    products:allProducts
  };
    console.log(order);
}
