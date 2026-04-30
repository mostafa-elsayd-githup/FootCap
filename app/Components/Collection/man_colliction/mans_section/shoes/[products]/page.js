"use server";
import NavAction from "../../../../../../Navbar/NavAction";
import Footer from "../../../../../../footer/Footre";
import Products from "./client_component";
import styles from "./page.module.css";
import NotFound from "./not-found";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
async function getWishlist() {
  const tokenstor = await cookies();
  const token = tokenstor.get("token")?.value;
  if (!token) {
    return { state: 401, message: "Please login to continue" };
  }
  const decryption = jwt.verify(token, process.env.JWT_SECRET);
  try {
    const res = await fetch(`http://localhost:1200/users/${decryption.id}`, {
      cache: "no-store",
      next: { tags: ["navbar"] },
    });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}
async function getProduct(id) {
  try {
    const res = await fetch(
      `http://localhost:1200/man_section_shoes/${id}`,
      {
        next: { revalidate: 60 }
      },
    );
    if (!res.ok) return undefined;
    const data = await res.json();
    return data;
  } catch {
    throw new Error("لا يمكن الاتصال بالسيرفر، تأكد من تشغيل json-server");
  }
}

export default async function ProductPage({ params }) {
  const resolvedParams = await params;
  const productId = resolvedParams.products;
  const products = await getProduct(productId);
  const wishlist = await getWishlist()
  if (!products) NotFound();
  const fillWidths = (products.rating / 5) * 100;
 var isfevorites = null
  return (
    <div className={styles.wrapper}>
      <NavAction />
      {isfevorites =!!wishlist.wishlist.some((wish)=> wish.id === products.id )}
      <Products fillWidth={fillWidths} product={products} isfevorite={isfevorites} />
      <Footer />
    </div>
  );
}
