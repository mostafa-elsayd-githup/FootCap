"use server";
import styles from "./products.module.css";
import AdminProducts from "./products";
import NavAction from "../../../../Navbar/NavAction";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
async function gitdata(section) {
  try {
    if (section === "Running") {
      const res = await fetch(
        `http://localhost:1200/your_sport_start_hear_running`,
        { next: { Tags: ["Running"] }, cache: "no-store" },
      );
      if (!res.ok) {
        return undefined;
      } else if (res.ok) {
        const data = await res.json();
        return { data, title: "Running" };
      }
    } else if (section === "GEM") {
      const res = await fetch(`http://localhost:1200/products?type=GEM`, {
        next: { Tags: ["Traning"] },
        cache: "no-store",
      });
      if (!res.ok) {
        return undefined;
      } else if (res.ok) {
        const data = await res.json();
        return { data, title: "Training" };
      }
    } else if (section === "FootBall") {
      const res = await fetch(
        `http://localhost:1200/your_sport_start_hear_Football`,
        {
          next: { Tags: ["FootBall"] },
          cache: "no-store",
        },
      );
      if (!res.ok) {
        return undefined;
      } else if (res.ok) {
        const data = await res.json();
        return { data, title: "Foot Ball" };
      }
    } else if (section === "Gym") {
      const res = await fetch(
        `http://localhost:1200/your_sport_start_hear_gym`,
        {
          next: { Tags: ["Gym"] },
          cache: "no-store",
        },
      );
      if (!res.ok) {
        return undefined;
      } else if (res.ok) {
        const data = await res.json();
        return { data, title: "Gym" };
      }
    } else if (section === "Tennis") {
      const res = await fetch(
        `http://localhost:1200/your_sport_start_hear_tennis`,
        {
          next: { Tags: ["tennis"] },
          cache: "no-store",
        },
      );
      if (!res.ok) {
        return undefined;
      } else if (res.ok) {
        const data = await res.json();
        return { data, title: "Tennis" };
      }
    } else if (section === "BasketBall") {
      const res = await fetch(
        `http://localhost:1200/your_sport_start_hear_backitball`,
        {
          next: { Tags: ["backitball"] },
          cache: "no-store",
        },
      );
      if (!res.ok) {
        return undefined;
      } else if (res.ok) {
        const data = await res.json();
        return { data, title: "Backit Ball" };
      }
    } else if (section === "Jackets") {
      const res = await fetch(`http://localhost:1200/WHAT'S_HOT_Jacket`, {
        next: { Tags: ["Jackets"] },
        cache: "no-store",
      });
      if (!res.ok) {
        return undefined;
      } else if (res.ok) {
        const data = await res.json();
        return { data, title: "Jackets" };
      }
    } else if (section === "Terrex") {
      const res = await fetch(`http://localhost:1200/WHAT'S_HOT_terrex`, {
        next: { Tags: ["terrex"] },
        cache: "no-store",
      });
      if (!res.ok) {
        return undefined;
      } else if (res.ok) {
        const data = await res.json();
        return { data, title: "terrex" };
      }
    }else if(section === "Simpson"){
        const res = await fetch(`http://localhost:1200/WHAT'S_HOT_simpsons`, {
        next: { Tags: ["simpsons"] },
        cache: "no-store",
      });
      if (!res.ok) {
        return undefined;
      } else if (res.ok) {
        const data = await res.json();
        return { data, title: "simpsons" };
      }
    }
  } catch {
    throw new Error("");
  }
}
async function Product({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const section = resolvedSearchParams.section;

  const data = await gitdata(section);

  return (
    <>
      <NavAction />

      <div className={styles.products}>
        <AdminProducts products={data} />
      </div>
    </>
  );
}

export default Product;
