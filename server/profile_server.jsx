"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClientForServer } from "@/utils/supabase";

export default async function logoutfun(prevent, dataform) {
  const buttontype = dataform.get("buttontype");
  if (buttontype === "logout") {
    try {
      const supabaseServer = await createClientForServer();
      const { error } = await supabaseServer.auth.signOut();

  if (error) {
    console.error("Supabase Logout Error:", error.message);
    return { message: error.message };
  }
  revalidatePath("/", "layout");
} catch (error) {
      console.error("Catch error during logout:", error);
      return { message: "Technical error during logout" };
    }
    redirect("/login");
  } else if (buttontype === "edit") {
  }
}






























// "use server";
// import { redirect } from "next/navigation";
// import { cookies } from "next/headers";


// export default async function logoutfun(prevent, dataform) {
//   const buttontype = dataform.get("buttontype");

//   if (buttontype === "logout") {
//     const cookiestore = await cookies();
//     cookiestore.get("token")?.value;
    
//    cookiestore.delete("token")
//    redirect("/login")
//   }else if(buttontype === "edit"){
//   }
// }

