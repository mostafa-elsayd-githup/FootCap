export const dynamic = 'force-dynamic';
import EditProductPage from "./editProduct";
import { createClientForServer } from "@/utils/supabase";
async function getProduct(id) {
  try {
    const supabaseServer = await createClientForServer();
    const { data: product, error: Errorproduct } = await supabaseServer
      .from("products")
      .select("*")
      .eq("id", id);
    if (!product || Errorproduct) {
      console.error("Error fetching products:", Errorproduct);
      return {};
    }
    return product[0];
  } catch (error) {
    throw error;
  }
}

export default async function ProductPage({ params }) {
  const resolvedParams = await params;
  const productId = resolvedParams.product;
  const products = await getProduct(productId);

  

  return <EditProductPage product={products} />
}
