"use server";
import NavAction from "../../Navbar/NavAction";
import Footer from "../../footer/Footre";
import Products from "./client_component";
import styles from "./page.module.css";
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";
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
    return await res.json();
  } catch(error) {
    return error;
  }
}

async function getProduct(id) {
  try {
    const res = await fetch(
      `http://localhost:1200/products/${id}`,
      {
        cache: "no-cache",
      },
    );
    const data = await res.json();
    return data;
  } catch (error){
    throw error;
  }
}

export default async function ProductPage({ params }) {
  
  const resolvedParams = await params;
  const productId = resolvedParams.products;
  const products = await getProduct(productId);
  const wishlist = await getWishlist();
  

  const fillWidths = (products.rating / 5) * 100;
  let isfevorites = null;
  return (
    <div className={styles.wrapper}>
      <NavAction />
      {isfevorites = !!wishlist?.wishlist.some((wish) => wish.id === products.id)}
      <Products
        fillWidth={fillWidths}
        product={products}
        isfevorite={isfevorites}
      />
      <Footer />
    </div>
  );
}
