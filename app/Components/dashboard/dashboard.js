"use client";
import React from "react";
import { useState } from "react";
import styles from "./dashboard.module.css";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faUsers,
  faBoxOpen,
  faBan,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
export default function Dashboard({ total, allUsers, orders, finalData }) {
  const totalmoney = new Intl.NumberFormat("en", {
    notation: "compact",
    style: "currency",
    currency: "EGP",
  }).format(total);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const toggleProducts = () => {
    setIsProductsOpen(!isProductsOpen);
  };
  return (
    <div className={styles.adminLayout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <h2>ADMIN PANEL</h2>
        <nav>
          <Link
            href="/Components/dashboard"
            className={`${styles.navLink} ${styles.activeLink} `}
          >
            <FontAwesomeIcon icon={faChartLine} /> Dashboard
          </Link>
          <div
            className={`${styles.navLink} ${isProductsOpen ? styles.activeLink : ""}`}
            onClick={toggleProducts}
            style={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>
              <FontAwesomeIcon
                icon={faBoxOpen}
                style={{ marginRight: "10px" }}
              />
              Products
            </span>

            <FontAwesomeIcon
              icon={isProductsOpen ? faChevronUp : faChevronDown}
              size="xs"
            />
          </div>
          {isProductsOpen && (
            <div className={styles.subMenu}>
              <Link
                href="/Components/dashboard/product/t-shirts"
                className={styles.subNavLink}
              >
                T-shirts
              </Link>
              <Link
                href="/Components/dashboard/product/shoes"
                className={styles.subNavLink}
              >
                Shoes
              </Link>
              <Link
                href="/Components/dashboard/product/accessories"
                className={styles.subNavLink}
              >
                Accessories
              </Link>
            </div>
          )}
          <Link
            href="/Components/dashboard/customer"
            className={`${styles.navLink}`}
          >
            <FontAwesomeIcon icon={faUsers} /> Customers
          </Link>
          <Link
            href="/Components/dashboard/blockLIst"
            className={`${styles.bolckLink}`}
          >
            <FontAwesomeIcon icon={faBan} /> Block List
          </Link>
        </nav>
      </aside>

      <main className={styles.content}>
        <div className={styles.titlepage}>
          <h1 className="fw-bold" style={{ color: "var(--color-primary)" }}>
            Analytics Overview
          </h1>
          <button
            className="btn btn-primary"
            style={{
              backgroundColor: "var(--color-primary)",
              border: "none",
              color: "var(--color-main)",
            }}
          >
            Export Report
          </button>
        </div>

        <div className={styles.topCards}>
          <div className={styles.card}>
            <span className={styles.cardTitle}>Total Revenue</span>
            <span className={styles.cardValue}>{totalmoney}</span>
          </div>
          <div className={styles.card}>
            <span className={styles.cardTitle}>Active Users</span>
            <span className={styles.cardValue}>
              {allUsers.length.toLocaleString()}
            </span>
          </div>
          <div className={styles.card}>
            <span className={styles.cardTitle}>Orders</span>
            <span className={styles.cardValue}>{orders.toLocaleString()}</span>
          </div>
        </div>

        <div className={styles.chartsGrid}>
          <div className={styles.chartBox}>
            <h5 className="mb-4" style={{ color: "var(--color-primary)" }}>
              Weekly Sales Flow
            </h5>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <AreaChart data={finalData}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="var(--rating-color)"
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--rating-color)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="var(--border-color)"
                  />
                  <XAxis
                    dataKey="name"
                    stroke="var(--color-secondary)"
                    fontSize={12}
                  />
                  <YAxis stroke="var(--color-secondary)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--bg-card)",
                      borderColor: "var(--border-color)",
                      color: "var(--color-primary)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    stroke="var(--rating-color)"
                    fillOpacity={1}
                    fill="url(#colorSales)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className={styles.chartBox}>
            <h5 className="mb-4" style={{ color: "var(--color-primary)" }}>
              Top Categories
            </h5>
            <ul className="list-unstyled">
              <li className="d-flex justify-content-between mb-3">
                <span style={{ color: "var(--color-secondary)" }}>Shoes</span>
                <span className="fw-bold">60%</span>
              </li>
              <li className="d-flex justify-content-between mb-3">
                <span style={{ color: "var(--color-secondary)" }}>Jerseys</span>
                <span className="fw-bold">25%</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
