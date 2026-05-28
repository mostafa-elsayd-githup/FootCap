"use server";
import BlockListClient from "./BlockLIst_clint";
import NavAction from "../../../Navbar/NavAction";

async function getusers() {
  try {
    const res = await fetch(`http://localhost:1200/blocked`, {
      cache: "no-store",
      next: { tags: ["usersBlock"] },
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
      <BlockListClient blockedUsers={data} />
    </>
  );
}
export default CusotomerServer;
