"use server";
import CartPage from "./child";
import NavAction from "../Navbar/NavAction";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import DiscoundComponent from "../Components/Collection/man_colliction/discound_componente/discounds";
import Footer from "../Components/footer/Footre";

export async function getdata() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const decryption = jwt.verify(token, process.env.JWT_SECRET);
  const res = await fetch(`http://localhost:1200/users/${decryption.id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data.cart;
}
const page = async () => {
  const data = await getdata();
  return (
    <>
      <NavAction />
      <CartPage card={data} />;
      <DiscoundComponent />
      <Footer />
    </>
  );
};
export default page;
