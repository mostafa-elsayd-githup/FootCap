"use server";
import { redirect } from "next/navigation";
import { createClientForServer } from "@/utils/supabase";
import { registerSchema } from "@/app/(auth)/authSchema/registerschema";
export async function registerAction(prevstate, formData) {

  const dataObject = Object.fromEntries(formData);
  const result = registerSchema.safeParse(dataObject);
  if (!result.success) {
    return { success: false, message: result.error.flatten().fieldErrors };
  }
  const { name, email, password } = result.data;
  
  try {
    const supabase = await createClientForServer();

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (authError) {
      return { message: authError.message };
    }

    if (authData?.user) {
      const { error: profileError } = await supabase.from("profiles").upsert(
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
