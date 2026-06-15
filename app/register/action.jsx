"use server";
import { redirect } from "next/navigation";
import { supabase, supabaseAdmin} from "@/utils/supabase"

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
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (authError) {
      return { message: authError.message };
    }

    if (authData?.user) {
      const { error: profileError } = await supabaseAdmin
        .from("profiles")
        .upsert(
          [
            {
              id: authData.user.id,
              full_name: name,
              email: email,
              role: "user",
              wishlist: [],
              cart: [],
              orders: [],
            },
          ],
          { onConflict: "id" },
        );

      if (profileError) {
        console.error("Profile creation error:", profileError.message);
        return { message: "Account created but profile setup failed." };
      }
    }
  } catch (error) {
    console.error("Catch error:", error);
    return { message: "Sorry, a technical error occurred." };
  }

  redirect("/login");
}
