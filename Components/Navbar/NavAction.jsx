"use server";

import NavBar from "./navbar";
import { createClientForServer } from "@/utils/supabase"; 

async function getuser() {
  try {
    const supabaseServer = await createClientForServer();

    const { data: { user }, error: authError } = await supabaseServer.auth.getUser();

    if (authError || !user) {
      return null;
    }

    const { data: profileData, error: profileError } = await supabaseServer
      .from("profiles")
      .select("wishlist, cart, full_name")
      .eq("id", user.id)
      .single();

    if (profileError) {
      console.error("Error fetching profile from Supabase:", profileError.message);
      return null;
    }

    return profileData;

  } catch (error) {
    console.error("Catch error in navbar getuser:", error);
    return null;
  }
}

export default async function NavAction() {
  const userdata = await getuser();


  return <NavBar userdata={userdata} />;
}

// "use server";
// import NavBar from "./navbar";
// import { cookies } from "next/headers";
// import jwt from "jsonwebtoken";
// async function getuser() {
//   const cookietore = await cookies();
//   const token = cookietore.get("token")?.value;
//   const decryption = jwt.verify(token, process.env.JWT_SECRET);

//   try {
//     const cartres = await fetch(
//       `http://localhost:1200/users/${decryption.id}`,
//       {
//         cache: "no-store",
//         next: { tags: ["navbar"] },
//       },
//     );

//     if (cartres.ok) {
//       const countcart = await cartres.json();
//       return countcart;
//     }
//   } catch (error){
//     throw error
//   }
// }
// export default async function NavAction() {
//   const userdata = await getuser();
//   return <NavBar productCount={userdata} />;
// }
