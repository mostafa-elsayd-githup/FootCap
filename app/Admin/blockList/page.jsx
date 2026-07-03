import { createClientForServer } from "@/utils/supabase";
import BlockListClient from "./BlockLIst_clint";

async function getusers() {
  try {
    const supabaseServer = await createClientForServer();
    const { data: users, error: userError } = await supabaseServer
      .from("blacklist")
      .select("*");
    if (userError) {
      console.error();
      return {
        deletingsuccess: false,
        message: "Failed to add user to blacklist",
      };
    }
    return users
  } catch (error) {
    console.error("Critical System Error:", error);
    throw error;
  }
}
async function CusotomerServer() {
  const data = await getusers();

  return <BlockListClient blockedUsers={data} />
}
export default CusotomerServer;
