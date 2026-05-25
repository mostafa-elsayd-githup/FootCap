"use server";
import NavAction from "@/app/Navbar/NavAction";
import Footer from "../footer/Footre";
import Products from "./wiahlist";
import MiniDrowp from "@/app/Components/minidrowp/minidrowp";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import DiscoundComponent from "@/app/Components/Collection/man_colliction/discound_componente/discounds";
const getData = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const decryption = jwt.verify(token, process.env.JWT_SECRET);

  const res = await fetch(`http://localhost:1200/users/${decryption.id}`);
  const userwishlist = await res.json();

  return userwishlist.wishlist;
};
async function page() {
  const wishlist = await getData() || [];

  return (
    <>
      <NavAction />
      <MiniDrowp/>
      <Products wishlist={wishlist} />
      <DiscoundComponent/>
      <Footer />
    </>
  );
}
export default page;
