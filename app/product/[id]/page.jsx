"use server";
import NavAction from "@/Components/Navbar/NavAction";
import Footer from "@/Components/footer/Footre";
import styles from "./page.module.css";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { notFound } from "next/navigation"; 
import ClientComponent from "./client_component";

async function getWishlist() {
  const tokenstor = await cookies();
  const token = tokenstor.get("token")?.value;
  if (!token) {
    return { state: 401, message: "Please login to continue" };
  }
  try {
    const decryption = jwt.verify(token, process.env.JWT_SECRET);
    const res = await fetch(`http://localhost:1200/users/${decryption.id}`, {
      cache: "no-store",
      next: { tags: ["navbar"] },
    });
    return await res.json();
  } catch (error) {
    return null;
  }
}

async function getProduct(id) {
  try {
    const res = await fetch(`http://localhost:1200/products/${id}`, {
      cache: "no-cache",
    });
    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    return null;
  }
}

export default async function ProductPage({ params }) {
  const resolvedParams = await params;
  const productId = resolvedParams.id; 

  const products = await getProduct(productId);
  const wishlist = await getWishlist();
  if (!products) {
    notFound();
  }

  const fillWidths = (products.rating / 5) * 100;
  const isfevorites = !!wishlist?.wishlist?.some(
    (wish) => wish.id === products.id,
  );

  return (
    <div className={styles.wrapper}>
      <NavAction />
      <ClientComponent
        fillWidth={fillWidths}
        product={products}
        isfevorite={isfevorites}
      />
      <Footer />
    </div>
  );
}
