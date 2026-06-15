"use server";
import CartPage from "./client";
import NavAction from "@/Components/Navbar/NavAction";
import Footer from "@/Components/footer/Footre";
import DiscoundComponent from "@/Components/discound_componente/discounds";
import { createClientForServer } from "@/utils/supabase";

export async function getdata() {
  try {
    const createServer = await createClientForServer();
    const { data: {user}, error: userError } = await createServer.auth.getUser();
    if (!user || userError) {
      return { state: 401, message: "Please first Create profile" };
    }
    const { data: profileData, error: dataError } = await createServer
      .from("profiles")
      .select("cart")
      .eq("id", user.id)
      .single();
    if (dataError) {
      console.error(
        "Error fetching profile from Supabase:",
        dataError.message,
      );
      return null;
    }

    return profileData.cart;
    
  } catch (error) {
    throw error;
  }
}
const page = async () => {
  const data = await getdata();  
  return (
    <>
      <NavAction />
      <CartPage card={data} />;
      <DiscoundComponent />
      <Footer />
    </>
  );
};
export default page;
