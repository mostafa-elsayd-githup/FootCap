"use server";
import NavAction from "@/Components/Navbar/NavAction";
import ProfilePage from "./profilepage";
import { createClientForServer } from "@/utils/supabase";

export async function GetAll_UserData() {
  const supabaseServer = await createClientForServer();

  const { data: { user }, error: Error } = await supabaseServer.auth.getUser();
  if (Error || !user) {
    console.log("Auth Error or No User found in Server:", Error?.message);
    return null;
  }

  const { data: profileData, error: profileError } = await supabaseServer
    .from("profiles")
    .select("wishlist, cart, full_name, email, created_at")
    .eq("id", user.id)
    .single();

  if (profileError) {
    console.error("Error fetching profile from Supabase:", profileError.message);
    return null;
  }

  return profileData; 
}

export default async function products() {
  const user = await GetAll_UserData();

  return (
    <>
      <NavAction />
      <ProfilePage users={user} />
    </>
  );
}