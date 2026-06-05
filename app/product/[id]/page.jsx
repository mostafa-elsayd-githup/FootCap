"use server";
import NavAction from "@/Components/Navbar/NavAction";
import Footer from "@/Components/footer/Footre";
import styles from "./page.module.css";
import { notFound } from "next/navigation";
import ClientComponent from "./client_component";
import { createClientForServer } from "@/utils/supabase";

// async function getWishlist() {
//   // const tokenstor = await cookies();
//   // const token = tokenstor.get("token")?.value;
//   // if (!token) {
//   //   return { state: 401, message: "Please login to continue" };
//   // }
//   try {
//     const supabaseServer = await createClientForServer();
//     const {
//       data: { user },
//       error: authError,
//     } = await supabaseServer.auth.getUser();
//     if (authError || !user) {
//       return null;
//     }
    
//     const { data: profileData, error: profileError } = await supabaseServer
//       .from("profiles")
//       .select("wishlist")
//       .eq("id", user.id)
//       .single();
//     if (profileError) {
//       console.error(
//         "Error fetching profile from Supabase:",
//         profileError.message,
//       );
//       return null;
//     }

//     return profileData;

//     // const decryption = jwt.verify(token, process.env.JWT_SECRET);
//     // const res = await fetch(`http://localhost:1200/users/${decryption.id}`, {
//     //   cache: "no-store",
//     //   next: { tags: ["navbar"] },
//     // });
//     // return await res.json();
//   } catch (error) {
//     return error;
//   }
// }

async function getProduct(id) {
  try {
  
    const supabaseServer = await createClientForServer();
    const { data, error } = await supabaseServer
      .from("products")
      .select("*")
      .eq("id", id);

    return data;
  } catch (error) {
    return null;
  }
}

export default async function ProductPage({ params }) {
  const resolvedParams = await params;
  const productId = resolvedParams.id;

  const products = await getProduct(productId);
  if (!products) {
    notFound();
  }

  const fillWidths = (products[0].rating / 5) * 100;


  return (
    <div className={styles.wrapper}>
      <NavAction />
      <ClientComponent
        fillWidth={fillWidths}
        product={products[0]}
      />
      <Footer />
    </div>
  );
}
