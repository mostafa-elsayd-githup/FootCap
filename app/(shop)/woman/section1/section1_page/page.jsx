import Footer from "@/Components/footer/Footre";
import DiscoundComponent from "@/Components/discound_componente/discounds";
import { createClientForServer } from "@/utils/supabase"; 
import ProductListClient from "./singelproduct";

async function getProductsByType(categoryKey) {
  try {
    const createClient = await createClientForServer();
    const { data, error } = await createClient
      .from("products")
      .select("*")
      .eq("type", categoryKey);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

async function Product({ searchParams }) {
  const queryParams = await searchParams;
  const categoryKey = queryParams.type;
  const data = await getProductsByType(categoryKey);

  return (
    <>
      <ProductListClient initialProducts={data}  />
      <DiscoundComponent />
      <Footer />
    </>
  );
}

export default Product;