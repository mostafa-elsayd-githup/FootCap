import { createClientForServer } from "@/utils/supabase";
import AdminUserProfile from "./clienrtprofile";

async function getusers(user) {
  try {
    const supabaseServer = await createClientForServer();
    const { data: getuser, error: UserError } = await supabaseServer
      .from("profiles")
      .select("*")
      .eq("id", user);
    if (!getuser || UserError) {
      return {
        deletingsuccess: false,
        message: "Failed to get user",
      };
    }
    return getuser[0];
  } catch (error) {
    throw error;
  }
}
async function CusotomerServer({ params }) {
  const user_id = await params;

  const user = user_id.profileuser;
  const data = await getusers(user);
  return <AdminUserProfile user={data} />
}
export default CusotomerServer;
