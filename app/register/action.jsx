"use server";
import { redirect } from "next/navigation";
import { createClientForServer } from "@/utils/supabase";

export async function registerAction(prevstate, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
    const supabaseServer = await createClientForServer();
  const { data: authData, error: authError } = await supabaseServer.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        full_name: name,
      },
    },
  });

  if (authError) {
    return { message: authError.message };
  }

  
} catch (error) {
  return { message: "Sorry, a technical error occurred." };
}

redirect("/login");
}
