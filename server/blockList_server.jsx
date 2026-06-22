"use server";

import { createClientForServer } from "@/utils/supabase";
import { revalidatePath } from "next/cache";

export default async function UnblockUsers(prevstate, formData) {
  const unblock = formData.get("unblock");
  const user = formData.get("user");

  if (unblock) {
    try {
      const supabaseServer = await createClientForServer();

      const { data: getuser, error: userError } = await supabaseServer
        .from("blacklist")
        .select("*")
        .eq("id", user);

      if (userError || !getuser || getuser.length === 0) {
        return {
          deletingsuccess: false,
          message: "User not found in blacklist or database error",
        };
      }

      const { error: unblockError } = await supabaseServer
        .from("profiles")
        .insert(getuser);

      if (unblockError) {
        console.error("Profiles Insert Error (Unblock):", unblockError);
        return {
          deletingsuccess: false,
          message: "Failed to restore user to profiles",
        };
      }

      const { error: deletedError } = await supabaseServer
        .from("blacklist")
        .delete()
        .eq("id", user);

      if (deletedError) {
        console.error("Error during blacklist deletion:", deletedError);
        return {
          deletingsuccess: false,
          message: "User restored but failed to remove from blacklist table",
        };
      }

      revalidatePath("/dashboard/customer");
      revalidatePath("/dashboard/blockList");

      return { deletingsuccess: true, message: "User unblocked successfully" };
    } catch (error) {
      console.error("Critical System Error during Unblock:", error);
      redirect("/error?type=technical");
    }
  }
}
