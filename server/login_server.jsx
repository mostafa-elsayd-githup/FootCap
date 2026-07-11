"use server";
import { redirect } from "next/navigation";
import { createClientForServer } from "@/utils/supabase";
import { LoginSchema } from "@/app/(auth)/authSchema/loginSchema";

export async function loginAction(prevstate, formData) {
  const dataobject = Object.fromEntries(formData);
  const loginResult = LoginSchema.safeParse(dataobject);
  if (!loginResult.success) {
    return { success: false, message: loginResult.error.flatten().fieldErrors };
  }
  const { email, password } = loginResult.data;

  try {
    const supabaseServer = await createClientForServer();
    const { error } = await supabaseServer.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.error("Supabase Login Error:", error.message);

      if (error.message.includes("Invalid login credentials")) {
        return {
          message: "Incorrect password or this account does not exist.",
        };
      }

      return { message: error.message };
    }
  } catch (error) {
    console.error("Server Catch Error:", error);
    return {
      message: "A technical server error occurred. Please try again later.",
    };
  }

  redirect("/");
}
