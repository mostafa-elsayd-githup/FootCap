"use server";
import NavBar from "./navbar";
import Error from "../error";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
export default async function NavAction() {
  const cookietore = await cookies();
  const token = cookietore.get("token")?.value;
  const decryption = jwt.verify(token, process.env.JWT_SECRET);

  try {
    const cartres = await fetch(
      `http://localhost:1200/users/${decryption.id}`,
      {
        cache:"no-store",
        next: { tags: ["navbar"] }
      },
    );

    if (!cartres.ok) {
      throw new Error("السيرفر يعطي استجابة خاطئة");
    }

    const countcart = await cartres.json();

    return <NavBar productCount={countcart} />;
  } catch (error) {
    console.error(error);
  }
}
