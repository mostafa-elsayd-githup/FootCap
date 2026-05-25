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
      return { message: "An error occurred" };
    }
    const users = await response.json();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || email.length < 8 || !emailRegex.test(email)) {
      return {
        message: "Please enter a valid email address",
      };
    }
    if (users.length === 0) {
      return {
        message: "This account does not exist. Please create a new account.",
      };
    }
    if (!password || password.length < 8) {
      return {
        message: "Password must be at least 8 characters long",
      };
    }

    const user = users[0];
    if (user.password !== password) {
      return {
        message: "Incorrect password. Please try again.",
      };
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
      maxAge: 60 * 60 * 60 * 24, 
      path: "/",
    });
  } catch {
    return { message: "Technical error" };
  }
  redirect("/");
}
