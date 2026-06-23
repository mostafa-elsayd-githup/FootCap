"use server";
import { createClientForServer } from "@/utils/supabase";
import NavAction from "@/Components/Navbar/NavAction";
import ProductTable from "./table";
async function gitdata(section) {
  try {
    const supabaseServer = await createClientForServer();
    const { data: product, error: productError } = await supabaseServer
      .from("products")
      .select("*")
      .eq("type", section);

    if (!product || productError) {
      console.error();
      return {};
    }
    return product;
  } catch (error) {
    throw error;
  }
}
async function Product({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const section = resolvedSearchParams.section;
  const data = await gitdata(section);

  return (
    <>
      <NavAction />
      <ProductTable products={data} />
    </>
  );
}

export default Product;
