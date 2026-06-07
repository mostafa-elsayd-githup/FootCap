"use server";
import NavAction from "@/Components/Navbar/NavAction";
import Footer from "@/Components/footer/Footre";
import DiscoundComponent from "@/Components/discound_componente/discounds";
import { createClientForServer } from "@/utils/supabase";
import ProductListClient from "../Hero/singelproduct";

async function getdata(category) {
  try {
    const createClient = await createClientForServer();
    const { data, error } = await createClient
      .from("products")
      .select("*")
      .eq("type", category);
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

  const data = await getdata(categoryKey);
  return (
    <>
      <NavAction />
      <ProductListClient initialProducts={data} />
      <DiscoundComponent />
      <Footer />
    </>
  );
}

export default Product;
