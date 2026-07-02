"use server";
import Footer from "@/Components/footer/Footre";
import DiscoundComponent from "@/Components/discound_componente/discounds";
import { createClientForServer } from "@/utils/supabase";
import ProductListClient from "./singelproduct";

async function getProductsByType() {
  try {
    const createClient = await createClientForServer();
    const { data, error } = await createClient
      .from("products")
      .select("*")
      .eq("type", "terrex");

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

async function Product() {
  const data = await getProductsByType();

  return (
    <>
      <ProductListClient initialProducts={data} />
      <DiscoundComponent />
      <Footer />
    </>
  );
}

export default Product;
