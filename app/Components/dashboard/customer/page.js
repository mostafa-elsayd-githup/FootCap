"use server";
import AdminCustomers from "./customer";
import NavAction from "../../../Navbar/NavAction";

async function getusers() {
  try {
    const res = await fetch(`http://localhost:1200/users`, {
      next: { tap: ["cuctomerPage"] },
      cache: "no-store",
    });
    if (res.ok) {
      return await res.json();
    }
  } catch {}
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
