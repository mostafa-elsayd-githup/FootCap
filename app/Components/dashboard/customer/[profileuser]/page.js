// "use server";
import AdminUserProfile from "./clienrtprofile";
import NavAction from "../../../../Navbar/NavAction";
import { useOpneing } from "../../../../RTK/storcontext";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

async function getusers(user) {
  
  try {
    const res = await fetch(`http://localhost:1200/users/${user}`, {
      cache: "no-store",
    });
    if (res.ok) {
      return await res.json();
    }
  } catch {}
}
async function CusotomerServer({params}) {
  const user_id = await params
  
  const user = user_id.profileuser
  const data = await getusers(user);  
  return (
    <>
      <NavAction />
      <AdminUserProfile user={data}/>
    </>
  );
}
export default CusotomerServer;
