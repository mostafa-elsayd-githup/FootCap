"use server";
import { createClientForServer } from "@/utils/supabase";
import { revalidatePath } from "next/cache";

export default async function HandleAtion(prevend, formData) {
  const search = formData.get("textvalue");
  const message = formData.get("message");
  const block = formData.get("block");
  const user = formData.get("user");

  if (block) {
    try {
      const supabaseServer = await createClientForServer();
      const { data: getuser, error: userError } = await supabaseServer
        .from("profiles")
        .select("*")
        .eq("id", user);
      if (userError || !getuser || getuser.length === 0)
        return {
          deletingsuccess: false,
          message: "User not found or database error",
        };
      const { error: profileError } = await supabaseServer
        .from("blacklist")
        .insert(getuser);
      if (profileError) {
        console.error("Blacklist Insert Error:", profileError);
        return {
          deletingsuccess: false,
          message: "Failed to add user to blacklist",
        };
      }

      const { error: deleteError } = await supabaseServer
        .from("profiles")
        .delete()
        .eq("id", user);
      if (deleteError) {
        console.error("Error during deletion:", deleteError);
        return {
          deletingsuccess: false,
          message: "User blacklisted but failed to delete from profiles",
        };
      }
      revalidatePath("/dashboard/customer");
      return { deletingsuccess: true, message: "User deleted" };
    } catch (error) {
      console.error("Critical System Error:", error);
      throw error;
    }
  }
  if (search !== " ") {
    const supabaseServer = await createClientForServer();
    const { data: profiles, error: profilesError } = await supabaseServer
      .from("profiles")
      .select("*")
      .or(`full_name.ilike.%${search}%,email.ilike.%${search}%`);
    if (profilesError) {
      return [];
    }
    if (profiles.length === 0) {
      return {
        users: [],
        foundState: 401,
        message: "User Not Found ",
        time: Date.now(),
      };
    }
    return {
      users: profiles,
      foundState: 200,
      message: "",
      time: Date.now(),
    };
  }
}

{
  // "use server";
  // import { createClientForServer } from "@/utils/supabase";
  // import { revalidateTag } from "next/cache";
  // export default async function HandleAtion(prevend, formData) {
  //   const search = formData.get("textvalue");
  //   const message = formData.get("message");
  //   const block = formData.get("block");
  //   const inputdialog = formData.get("inputdialog");
  //   try {
  //     if (search) {
  //       const supabaseServer = await createClientForServer();
  //       const { data: profiles, error: profilesError } = await supabaseServer
  //         .from("profiles")
  //         .select("*");
  //       if (profilesError) {
  //         return [];
  //       }
  //        profiles.filter((user) => {
  //         if (user.full_name.includes(search) || user.email.includes(search)) {
  //           console.log("yes");
  //           return user;
  //         } else {
  //           return { fou: 401, message: "Not Found User" };
  //         }
  //       });
  //     } else if (block) {
  //       if (block && !inputdialog) {
  //         return { blockState: true, timeStamp: Date.now() };
  //       }
  //       if (inputdialog === "yes") {
  //         const user = await fetch(`http://localhost:1200/users/${block}`);
  //         if (user.ok) {
  //           let userdata = await user.json();
  //           await fetch(`http://localhost:1200/blocked`, {
  //             method: "POST",
  //             headers: { "Content-type": "application/json" },
  //             body: JSON.stringify(userdata),
  //           });
  //           const deleteUser = await fetch(`http://localhost:1200/users`);
  //           if (deleteUser.ok) {
  //             await fetch(`http://localhost:1200/users/${block}`, {
  //               cache: "no-cache",
  //               method: "DELETE",
  //             });
  //             revalidateTag("cuctomerPage");
  //             revalidateTag("usersBlock");
  //             return { blockState: false };
  //           }
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     return [];
  //   }
  // }
}
