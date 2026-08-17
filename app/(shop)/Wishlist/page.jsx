import Products from "./wiahlist";
import MiniDrowp from "@/Components/minidrowp/minidrowp";

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
  const result = (await getData()) || [];
  const wishlist = result.wishlist;

  return (
    <>
      <MiniDrowp />
      <Products wishlist={wishlist} />
    </>
  );
}
export default page;
