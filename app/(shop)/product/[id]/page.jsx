
import styles from "./page.module.css";

import ClientComponent from "./client_component";
import { createClientForServer } from "@/utils/supabase";

async function getProduct(id) {
  try {
    const supabaseServer = await createClientForServer();
    const { data, error } = await supabaseServer
      .from("products")
      .select("*")
      .eq("id", id);
    if (error) {
      return
    }
    return data;
  } catch (error) {
    return null;
  }
}

export default async function ProductPage({ params }) {
  const resolvedParams = await params;
  const productId = resolvedParams.id;

  const products = await getProduct(productId);

  const fillWidths = (products[0].rating / 5) * 100;

  return (
    <div className={styles.wrapper}>
      <ClientComponent fillWidth={fillWidths} product={products[0]} />
    </div>
  );
}
