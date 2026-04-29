"use server";
import { cache } from "react";
import NavAction from "../../../../Navbar/NavAction";
import Footer from "../../../../footer/Footre";
import Products from "./client_component";
import styles from "./page.module.css";

async function getWishlist() {
  try {
    const res = await fetch(`http://localhost:1200/wishlist`, {
      cache: "no-store", 
      next: { tags: ["wishlist"] },
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
      `http://localhost:1200/your_sport_start_hear_Football/${id}`,
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
  if (!products) notFound();
  const fillWidths = (products.rating / 5) * 100;
 var isfevorites = null
  return (
    <div className={styles.wrapper}>
      <NavAction />
      {isfevorites =!!wishlist.some((wish)=> wish.id === products.id )}
      <Products fillWidth={fillWidths} product={products} isfevorite={isfevorites} />
      <Footer />
    </div>
  );
}
