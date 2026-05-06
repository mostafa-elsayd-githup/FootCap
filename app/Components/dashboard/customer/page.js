"use client";
import React from "react";
import styles from "./customer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faChartLine, faBoxOpen, faUsers, faSearch, 
  faEye, faEnvelope, faUserSlash 
} from "@fortawesome/free-solid-svg-icons";;
import Link from "next/link";
const customers = [
  {
    id: 1,
    name: "زياد أحمد",
    email: "ziad@example.com",
    orders: 12,
    spent: "EGP 8,400",
    status: "Active",
  },
  {
    id: 2,
    name: "عمر خالد",
    email: "omar@example.com",
    orders: 5,
    spent: "EGP 3,200",
    status: "Active",
  },
  {
    id: 3,
    name: "ياسين علي",
    email: "yassin@example.com",
    orders: 0,
    spent: "EGP 0",
    status: "Inactive",
  },
];

export default function AdminCustomers() {
  return (
   <div className={styles.adminLayout}>
      

      <aside className={styles.sidebar}>
        <h2>ADMIN PANEL</h2>
        <nav>
          <Link href="/Components/dashboard" className={`${styles.navLink}`}>
            <FontAwesomeIcon icon={faChartLine} /> Dashboard
          </Link>
          <Link href="/Components/dashboard/product" className={styles.navLink}>
            <FontAwesomeIcon icon={faBoxOpen} /> Products
          </Link>

          <Link href="/Components/dashboard/customer" className={`${styles.navLink} ${styles.activeLink}`}>
            <FontAwesomeIcon icon={faUsers} /> Customers
          </Link>
        </nav>
      </aside>

      <div className={styles.content}>    
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black italic uppercase" style={{ color: "var(--color-primary)" }}>
              Customer Base
            </h1>
            <p className="text-gray-500 text-sm">
              Managing and analyzing data of registered customers
            </p>
          </div>

          <div className={styles.searchWrapper}>
            <input
              type="text"
              placeholder="Search by name or email..."
              className={styles.searchInput}
            />
            <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
          </div>
        </div>
        <div >
          <table className={styles.customerTable}>
            <thead>
              <tr>
                <th className="text-left">Customer</th>
                <th className="text-left">Status</th>
                <th className="text-left">Orders</th>
                <th className="text-left">Total Spent</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
            
              {customers.map((user) => (
                <tr key={user.id} className={styles.tableRow}>
                  <td className="flex items-center gap-3">
                    <div className={styles.avatar}>{user.name[0]}</div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                  </td>
                  <td>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        user.status === "Active" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                      }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="font-semibold">{user.orders} Orders</td>
                  <td className="font-black text-blue-500">{user.spent}</td>
                  <td>
                    <div className={styles.actionContainer}>
                      <button className={`${styles.actionBtn} ${styles.viewBtn}`} title="View Profile">
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      <button className={`${styles.actionBtn} ${styles.emailBtn}`} title="Send Email">
                        <FontAwesomeIcon icon={faEnvelope} />
                      </button>
                      <button className={`${styles.actionBtn} ${styles.blockBtn}`} title="Block User">
                        <FontAwesomeIcon icon={faUserSlash} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
