"use server";
import NavAction from "../../../../Navbar/NavAction";
import EditProductPage from "./editProduct";
async function getProduct(id) {
  try {
    const res = await fetch(`http://localhost:1200/products/${id}`, {
      next:{tags:["edit"]},cache: "no-cache"
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
