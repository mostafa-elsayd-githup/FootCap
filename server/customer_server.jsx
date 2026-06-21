"use server";
import { createClientForServer } from "@/utils/supabase";
import { revalidateTag } from "next/cache";

export default async function HandleAtion(prevend, formData) {
  const search = formData.get("textvalue");
  const message = formData.get("message");
  const block = formData.get("block");
  const inputdialog = formData.get("inputdialog");

  try {
    if (search) {
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
    } else if (block) {
      // if (block && !inputdialog) {
      //   return { blockState: true, timeStamp: Date.now() };
      // }
      // if (inputdialog === "yes") {
      //   const user = await fetch(`http://localhost:1200/users/${block}`);
      //   if (user.ok) {
      //     let userdata = await user.json();
      //     await fetch(`http://localhost:1200/blocked`, {
      //       method: "POST",
      //       headers: { "Content-type": "application/json" },
      //       body: JSON.stringify(userdata),
      //     });
      //     const deleteUser = await fetch(`http://localhost:1200/users`);
      //     if (deleteUser.ok) {
      //       await fetch(`http://localhost:1200/users/${block}`, {
      //         cache: "no-cache",
      //         method: "DELETE",
      //       });
      //       revalidateTag("cuctomerPage");
      //       revalidateTag("usersBlock");
      //       return { blockState: false };
      //     }
      //   }
      // }
    }
  } catch (error) {
    console.error(error);
    return [];
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
