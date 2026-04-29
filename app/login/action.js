"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

export async function loginAction(prevstate, formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  try {
    const response = await fetch(`http://localhost:1200/users?email=${email}`);
    if (!response.ok) {
      return { message: "حدث خطاء فنى" };
    }
    const users = await response.json();
    if (users.length === 0 || users[0].password !== password) {
      return { message: "Email or Passowrd is Woring" };
    }
  
    const token = jwt.sign(
      { id: users[0].id, email: users[0].email }, // => made the signature from payload and secret_key
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // يوم واحد
      path: "/",
    });
  } catch {
    return { message: "عذراً، حدث خطأ فني غير متوقع" };
  }
  redirect("/");
}
