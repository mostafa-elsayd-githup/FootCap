"use server";
import NavBar from "./navbar";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
async function getuser() {
  const cookietore = await cookies();
  const token = cookietore.get("token")?.value;
  const decryption = jwt.verify(token, process.env.JWT_SECRET);

  try {
    const cartres = await fetch(
      `http://localhost:1200/users/${decryption.id}`,
      {
        cache: "no-store",
        next: { tags: ["navbar"] },
      },
    );

    if (cartres.ok) {
      const countcart = await cartres.json();
      return countcart;
    }
  } catch {
    console.error("check your intrnet conect");
  }
}
export default async function NavAction() {
  const userdata = await getuser();
  return <NavBar productCount={userdata} />;
}
