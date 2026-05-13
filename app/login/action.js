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

    if (users.length === 0) {
      return { message: "This account does not exist. Please create a new account." };
    }
    const user = users[0];
    if (user.password !== password) {
      return { message: "Incorrect password" };
    }
    const token = jwt.sign(
      { id: users[0].id, email: users[0].email }, // => made the signature from payload and secret_key
      process.env.JWT_SECRET,
      { expiresIn: "60d" },
    );

    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 60 * 24, // يوم 60
      path: "/",
    });
  } catch {
    return { message: "عذراً، حدث خطأ فني غير متوقع" };
  }
  redirect("/");
}
