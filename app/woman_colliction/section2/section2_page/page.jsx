"use server";
import Link from "next/link";
import styles from "./page.module.css";
import SingleProduct from "./singelproduct";
import NavAction from "@/Components/Navbar/NavAction";
import MiniDrowp from "@/Components/minidrowp/minidrowp";
import { createClientForServer } from "@/utils/supabase";
async function gitdata(categorykey) {
  try {
    const createClient = await createClientForServer();
    const { data, error } = await createClient
      .from("products")
      .select("*")
      .eq("type", categorykey);
    return data;
  } catch (error) {
    throw error;
  }
}

async function Product({ searchParams }) {
  const queryParams = await searchParams;
  const categoryKey = queryParams.type;
  const data = await gitdata(categoryKey);
  return (
    <>
      <NavAction />
      <div className={styles.Container}>
        <div className={styles.text}>
          <span className={styles.spans}>
            <Link
              className={styles.span}
              href="/Components/sport-Componente/sportProcuts/sport_from_gemProducts?club=tshirt"
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
            Adidaes Running Collection{" "}
            <span style={{ fontSize: "15px", color: "#7777" }}>
              ( {data.length} )
            </span>
          </h1>
        </div>
        <MiniDrowp />
        <div className={styles.products}>
          {data &&
            data.map((item) => {
              return <SingleProduct key={item.id} productItem={item} />;
            })}
        </div>
      </div>
    </>
  );
}

export default Product;
