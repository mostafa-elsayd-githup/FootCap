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
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./sidbar.module.css";

export default function Sidebar() {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isSectionsOpen, setIsSectionsOpen] = useState(false);

  const [subMenus, setSubMenus] = useState({
    Mans: false,
    Womans: false,
    Childrens: false,
  });

  const toggleProducts = () => setIsProductsOpen(!isProductsOpen);
  const toggleSections = () => setIsSectionsOpen(!isSectionsOpen);

  const toggleSubMenu = (menuKey) => {
    setSubMenus((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }));
  };

  const product = [
    { id: "Running", label: "Running" },
    { id: "GEM", label: "Sport" },
    { id: "FootBall", label: "Foot Ball" },
    { id: "Gym", label: "Gym" },
    { id: "Tennis", label: "Tennis" },
    { id: "BasketBall", label: "Basket Ball" },
    { id: "Jackets", label: "Jackets" },
    { id: "Terrex", label: "Terrex" },
    { id: "Simpson", label: "Simpson" },
  ];

  const sectionsData = [
    { id: "Mans", label: "Mans" },
    { id: "Womans", label: "Womans" },
    { id: "Childrens", label: "Childrens" },
  ];

  const nestedItems = [
    { id: "1", label: "Category 1" },
    { id: "2", label: "Category 2" },
    { id: "3", label: "Category 3" },
  ];

  return (
    <aside className={styles.sidebar}>
      <h2>ADMIN PANEL</h2>
      <nav>
        <Link href="/Components/dashboard" className={styles.navLink}>
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

        <div
          className={`${styles.subMenu} ${isProductsOpen ? styles.open : ""}`}
        >
          {product.map((sec) => (
            <Link
              key={sec.id}
              href={`/Components/dashboard/products/product?section=${sec.id}`}
              className={styles.subNavLink}
            >
              {sec.label}
            </Link>
          ))}
        </div>

        <div
          className={`${styles.navLink} ${isSectionsOpen ? styles.activeLink : ""}`}
          onClick={toggleSections}
          style={{ cursor: "pointer" }}
        >
          <span>
            <FontAwesomeIcon
              icon={faLayerGroup}
              className={styles.iconMargin}
            />
            Sections
          </span>
          <FontAwesomeIcon
            icon={isSectionsOpen ? faChevronUp : faChevronDown}
            size="xs"
            className={styles.chevron}
          />
        </div>

        <div
          className={`${styles.subMenu} ${isSectionsOpen ? styles.open : ""}`}
        >
          {sectionsData.map((sec) => (
            <div key={sec.id} className={styles.nestedMenuWrapper}>
              <div
                className={`${styles.nestedTrigger} ${subMenus[sec.id] ? styles.nestedActive : ""}`}
                onClick={() => toggleSubMenu(sec.id)}
              >
                <span>{sec.label}</span>
                <FontAwesomeIcon
                  icon={subMenus[sec.id] ? faChevronUp : faChevronDown}
                  size="xs"
                />
              </div>

              <div
                className={`${styles.nestedSubMenu} ${subMenus[sec.id] ? styles.nestedOpen : ""}`}
              >
                {nestedItems.map((item) => (
                  <Link
                    key={item.id}
                    href={`/Components/dashboard/products/product?section=${sec.id}&type=${item.id}`}
                    className={styles.subNavLink}
                  >
                    {sec.label} {item.id}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Link href="/Components/dashboard/customer" className={styles.navLink}>
          <span>
            <FontAwesomeIcon icon={faUsers} className={styles.iconMargin} />
            Customers
          </span>
        </Link>

        <Link
          href="/Components/dashboard/blockLIst"
          className={styles.bolckLink}
        >
          <FontAwesomeIcon icon={faBan} />
          Block List
        </Link>
      </nav>
    </aside>
  );
}
