import { createClientForServer } from "@/utils/supabase";
import ProductListClient from "./singelproduct";

async function getProductsByType() {
  try {
    const createClient = await createClientForServer();
    const { data, error } = await createClient
      .from("products")
      .select("*")
      .eq("type", "short");

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
