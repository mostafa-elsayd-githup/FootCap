import Footer from "@/Components/footer/Footre";
import Products from "./wiahlist";
import MiniDrowp from "@/Components/minidrowp/minidrowp";
import DiscoundComponent from "@/Components/discound_componente/discounds";
import { createClientForServer } from "@/utils/supabase";
const getData = async () => {
  try {
    const creatClient = await createClientForServer();
    const {
      data: { user },
      error: authError,
    } = await creatClient.auth.getUser();
    if (authError || !user) {
      return null;
    }
    const { data: profileData, error: profileError } = await creatClient
      .from("profiles")
      .select("wishlist")
      .eq("id", user.id)
      .single();
    if (profileError) {
      console.error(
        "Error fetching profile from Supabase:",
        profileError.message,
      );
      return null;
    }
    return profileData;
  } catch (error) {
    throw error;
  }
};
async function page() {
  const wishlist = (await getData()) || [];
  
  return (
    <>
      <MiniDrowp />
      <Products wishlist={wishlist} />
      <DiscoundComponent />
      <Footer />
    </>
  );
}
export default page;
