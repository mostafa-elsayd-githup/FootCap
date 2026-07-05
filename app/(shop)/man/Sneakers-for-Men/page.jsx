import { createClientForServer } from "@/utils/supabase";
import ProductListClient from "./single_prodecte_for_section2";

async function getProductsByType() {
  try {
    const createClient = await createClientForServer();
    const { data, error } = await createClient
      .from("products")
      .select("*")
      .eq("type", "Sneakers_for_Men");

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

async function Product() {
  const data = await getProductsByType();

  return <ProductListClient initialProducts={data} />;
}

export default Product;
