"use server";
import { redirect } from "next/navigation";

export async function registerAction(prevstate, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  console.log(password);

  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password,
    role: "user",
    createdAt: new Date().toISOString(),
    wishlist: [],
    cart: [],
    order: [],
  };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //  <=Regex (chick email include a @ and two or three chr.. (.com or .org or .io ))
  const nameRegex = /^[a-zA-Z\s\u0600-\u06FF]+$/;
  if (!name || !nameRegex.test(name.trim())) {
    return { message: "Please, enter a valid name" };
  }
  if (!email || email.length < 8 || !emailRegex.test(email)) {
    return { message: "Please enter a valid email address" };
  }
  if (!password || password.length < 8) {
    return {
      message: "Please, Enter a strong password (minimum 8 characters)",
    };
  }
  try {
    const response = await fetch(`http://localhost:1200/users?email=${email}`);
    if (response.ok) {
      const users = await response.json();
      if (users.length > 0) {
        return {
          message:
            "An account is associated with this email address. Please try logging in or use a different email address",
        };
      }
    }
    await fetch(`http://localhost:1200/users`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    return { message: "Sorry, a technical error occurred." };
  }
  redirect("/login");
}
