"use server";
import Link from "next/link";
import SingleProduct from "./singleProduct_for_Ceation1";
import styles from "./products.module.css";
import Footer from "@/Components/footer/Footre";
import DiscoundComponent from "@/Components/discound_componente/discounds";
import NavAction from "@/Components/Navbar/NavAction";
import MiniDrowp from "@/Components/minidrowp/minidrowp";
import { createClientForServer } from "@/utils/supabase";
import { createClient } from "@supabase/supabase-js";

async function getData(categoryKey) {
  try {
    const CreateClient = await createClientForServer();
    const { data, error } = await CreateClient
      .from("products")
      .select("*")
      .eq("type", categoryKey);
    return data;
  } catch (error) {
    throw error;
  }
}

async function Product({ searchParams }) {
  const qurey = await searchParams;
  const categoryKey = qurey.type;
  const data = await getData(categoryKey);

  return (
    <>
      <NavAction />
      <div className={styles.Container}>
        <div className={styles.text}>
          <span className={styles.spans}>
            <Link
              className={styles.span}
              href="/Components/sport-Componente/sportProcuts/sport_from_gemProducts"
            >
              Sport /
            </Link>
            <span>
              {"   "}
              <Link className={styles.span} href="">
                Gym & Training
              </Link>
            </span>
          </span>
          <h1 className={styles.title}>
            Men&apos;s Jerseys{" "}
            <span style={{ fontSize: "15px", color: "#7777" }}>
              ( {data.length} )
            </span>
          </h1>
        </div>
        <MiniDrowp />
        <div className={styles.products}>
          {data &&
            data.map((item, index) => {
              return (
                <SingleProduct
                  key={item.id}
                  productItem={item}

                />
              );
            })}
        </div>
      </div>
      <DiscoundComponent />
      <Footer />
    </>
  );
}
export default Product;
