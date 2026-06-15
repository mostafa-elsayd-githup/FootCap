"use server";
import { createClientForServer } from "@/utils/supabase";
import AdminCustomers from "./customer";
import NavAction from "@/Components/Navbar/NavAction";

async function getusers() {
  try {
    const supabaseServer = await createClientForServer();
    const { data: users, error: profileError } = await supabaseServer
      .from("profiles")
      .select("*");
    if (profileError) {
      return [];
    }
    return users;
  } catch (error) {
    throw error;
  }
}
async function CusotomerServer() {
  const data = await getusers();
  return (
    <>
      <NavAction />
      <AdminCustomers users={data} />
    </>
  );
}
export default CusotomerServer;
