"use client"
import React from "react";
import Sidebar from "./sidbar/sidbar"; // ⚠️ عدل المسار ده لمكان ملف الـ Sidebar بتاعك
import styles from "./layout.module.css"; // ملف الـ CSS الأساسي للـ Layout

export default function DashboardLayout({ children }) {
  return (
    <div className={styles.layoutContainer}>
      {/* الـ Sidebar هيثبت هنا ومش هيتكرر كوده ولا هيحمل من جديد بين الصفحات */}
      <Sidebar />
      
      {/* الـ Main Content اللي بيتغير حسب الصفحة (Dashboard, Running, Customers) */}
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}