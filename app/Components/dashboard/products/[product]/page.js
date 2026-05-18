"use server";
import NavAction from "../../../../Navbar/NavAction";
import Footer from "../../../../footer/Footre";
import EditProductPage from "./editProduct";
// import NotFound from "./not-found";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

async function getProduct(id) {
  try {
    const res = await fetch(`http://localhost:1200/products/${id}`, {
      cache: "no-cache",
    });

    const data = await res.json();
    return data;
  } catch {
    throw new Error("لا يمكن الاتصال بالسيرفر، تأكد من تشغيل json-server");
  }
}

export default async function ProductPage({ params }) {
  const resolvedParams = await params;
  const productId = resolvedParams.product;
  const products = await getProduct(productId);

  return (
    <>
      <NavAction />
      <EditProductPage product={products} />
    </>
  );
}
