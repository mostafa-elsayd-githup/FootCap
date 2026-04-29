"use server";
import { cookies } from "next/headers";
import NavAction from "../Navbar/NavAction";
import ProfilePage from "./profilepage";
import jwt from "jsonwebtoken";

<<<<<<< HEAD
const cookiestore = await cookies();
const token = cookiestore.get("token")?.value;
console.log(token);
=======
export async function GetAllUserData() {
  const cookiestore = await cookies();
  const token = cookiestore.get("token")?.value;

  const decryption = jwt.verify(token, process.env.JWT_SECRET);
>>>>>>> c9dbbef083a510ff9ff89ee2a4d06dedd27d3460

const decryption = jwt.verify(token, process.env.JWT_SECRET);
export async function GetAll_UserData() {
  const getuserdata = await fetch(
    `http://localhost:1200/users/${decryption.id}`,
  );
  if (getuserdata.ok) {
    const userData = await getuserdata.json();
    return userData;
  }
}
<<<<<<< HEAD
export async function Get_Wishlist_num() {
  const Wishlist = await fetch(`http://localhost:1200/users/${decryption.id}`);
  const wishlistData = await Wishlist.json();
  return wishlistData;
}
export default async function products() {
  const user = await GetAll_UserData();
  const statistics = await Get_Wishlist_num();

=======
export async function Get_Order_Wishlist_num() {
  const Wishlist = await fetch(`http://localhost:1200/wishlist`);
  const wishlistData = await Wishlist.json();
  return wishlistData
}
export default async function products() {
  const user = await GetAllUserData();
  const statistics = await Get_Order_Wishlist_num();
>>>>>>> c9dbbef083a510ff9ff89ee2a4d06dedd27d3460

  return (
    <>
      <NavAction />
      <ProfilePage users={user} User_statistics={statistics} />
    </>
  );
}
