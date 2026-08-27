"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faBoxOpen,
  faChevronDown,
  faChevronUp,
  faUsers,
  faBan,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./sidbar.module.css";

export default function Sidebar() {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isopen, setisopen] = useState(false);
  const toggleProducts = () => setIsProductsOpen(!isProductsOpen);

  const product = [
    { id: "Running", label: "Running" },
    { id: "GEM", label: "Sport" },
    { id: "Football", label: "FootBall" },
    { id: "gym", label: "Gym" },
    { id: "tennis", label: "Tennis" },
    { id: "Basketball", label: "BasketBall" },
    { id: "Jacket", label: "Jackets" },
    { id: "terrex", label: "Terrex" },
    { id: "simpsons", label: "Simpson" },
    { id: "tshirt", label: "T-shirt" },
    { id: "hoogies", label: "Hoody" },
    { id: "short", label: "Short" },
    { id: "shoes", label: "shoes" },
    { id: "Liverpool", label: "Liverpool" },
    { id: "ArsenalClub", label: "Arsenal" },
    { id: "Bayern Munich", label: "Bayern Munich" },
    { id: "Man United", label: "Man United" },
    { id: "Real Madrid", label: "Real Madrid" },
    { id: "alahly", label: "AlAhly" },
    { id: "Men_s_Jerseys", label: "Men's Jerseys" },
    { id: "Sneakers_for_Men", label: "Sneakers for Men" },
  ];

  return (
   
  <aside className={`${styles.sidebar} ${isopen ? styles.sidebarOpen : ""}`}>
  <button
    className={styles.opneButton}
    type="button"
    onClick={() => setisopen(!isopen)}
    aria-label="Toggle Sidebar"
  >
    ADMIN PANEL
  </button>

  <div className={styles.sidebarContent}>
    <h2>ADMIN PANEL</h2>
    <nav>
      <Link href="/Admin/dashboard" className={styles.navLink}>
        <span>
          <FontAwesomeIcon icon={faChartLine} className={styles.iconMargin} />
          Dashboard
        </span>
      </Link>

      <div
        className={`${styles.navLink} ${isProductsOpen ? styles.activeLink : ""}`}
        onClick={toggleProducts}
        style={{ cursor: "pointer" }}
      >
        <span>
          <FontAwesomeIcon icon={faBoxOpen} className={styles.iconMargin} />
          Products
        </span>
        <FontAwesomeIcon
          icon={isProductsOpen ? faChevronUp : faChevronDown}
          size="xs"
          className={styles.chevron}
        />
      </div>

      <div className={`${styles.subMenu} ${isProductsOpen ? styles.open : ""}`}>
        {product.map((sec) => (
          <Link
            key={sec.id}
            href={`/Admin/products/?section=${sec.id}`}
            className={styles.subNavLink}
          >
            {sec.label}
          </Link>
        ))}
      </div>

      <Link href="/Admin/customer/" className={styles.navLink}>
        <span>
          <FontAwesomeIcon icon={faUsers} className={styles.iconMargin} />
          Customers
        </span>
      </Link>

      <Link href="/Admin/feedback" className={styles.navLink}>
        <span>
          <FontAwesomeIcon icon={faMessage} className={styles.iconMargin} />
          FeedBack
        </span>
      </Link>

      <Link href="/Admin/blockList" className={styles.bolckLink}>
        <FontAwesomeIcon icon={faBan} />
        Black List
      </Link>
    </nav>
  </div>
</aside>
  
  );
}
