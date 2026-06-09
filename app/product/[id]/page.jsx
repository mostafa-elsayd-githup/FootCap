"use server";
import NavAction from "@/Components/Navbar/NavAction";
import Footer from "@/Components/footer/Footre";
import styles from "./page.module.css";
import { notFound } from "next/navigation";
import ClientComponent from "./client_component";
import { createClientForServer } from "@/utils/supabase";


async function getProduct(id) {
  try {
  
    const supabaseServer = await createClientForServer();
    const { data, error } = await supabaseServer
      .from("products")
      .select("*")
      .eq("id", id);

    return data;
  } catch (error) {
    return null;
  }
}

export default async function ProductPage({ params }) {
  const resolvedParams = await params;
  const productId = resolvedParams.id;

  const products = await getProduct(productId);
  if (!products) {
    notFound();
  }

  const fillWidths = (products[0].rating / 5) * 100;


  return (
    <div className={styles.wrapper}>
      <NavAction />
      <ClientComponent
        fillWidth={fillWidths}
        product={products[0]}
      />
      <Footer />
    </div>
  );
}
