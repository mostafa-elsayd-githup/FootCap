import CheckoutPage from "./ckeckoutclien";
import { createClientForServer } from "@/utils/supabase";

export async function getdata() {
  const supabaseServer = await createClientForServer();
  const {
    data: { user },
    error: userError,
  } = await supabaseServer.auth.getUser();
  if (!user || userError) {
    return [];
  }
  const { data: profile, profileError } = await supabaseServer
    .from("profiles")
    .select("cart")
    .eq("id", user.id)
    .single();
  if (profileError) {
    console.error(
      "Error fetching profile from Supabase:",
      profileError.message,
    );
    return null;
  }
  return profile.cart;
}
const page = async () => {
  const data = await getdata();
  return  <CheckoutPage cartItems={data} />
};
export default page;
