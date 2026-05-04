"use client"; // نحتاجها عشان الـ Charts بتعتمد على الـ Browser
import React from 'react';
import styles from "./admin.module.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area } from 'recharts';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faUsers, faBoxOpen, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

// بيانات تجريبية (ممكن تجيبها من json-server لاحقاً)
const data = [
  { name: 'Sat', sales: 400 }, { name: 'Sun', sales: 700 },
  { name: 'Mon', sales: 500 }, { name: 'Tue', sales: 900 },
  { name: 'Wed', sales: 600 }, { name: 'Thu', sales: 1200 },
  { name: 'Fri', sales: 1500 },
];

export default function Dashboard() {
  return (
    <div className={styles.adminLayout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <h2>ADMIN PANEL</h2>
        <nav>
          <Link href="/" className={`${styles.navLink} ${styles.activeLink}`}>
            <FontAwesomeIcon icon={faChartLine} /> Dashboard
          </Link>
          <Link href="/" className={styles.navLink}>
            <FontAwesomeIcon icon={faBoxOpen} /> Products
          </Link>
          <Link href="/">
            <FontAwesomeIcon icon={faUsers} /> Customers
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={styles.content}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fw-bold" style={{color: 'var(--color-primary)'}}>Analytics Overview</h1>
          <button className="btn btn-primary" style={{backgroundColor: 'var(--color-primary)', border:'none'}}>Export Report</button>
        </div>

        {/* Stats Cards */}
        <div className={styles.topCards}>
          <div className={styles.card}>
            <span className={styles.cardTitle}>Total Revenue</span>
            <span className={styles.cardValue}>EGP 45.2k</span>
          </div>
          <div className={styles.card}>
            <span className={styles.cardTitle}>Active Users</span>
            <span className={styles.cardValue}>1,250</span>
          </div>
          <div className={styles.card}>
            <span className={styles.cardTitle}>Orders</span>
            <span className={styles.cardValue}>+85</span>
          </div>
        </div>

        {/* Charts */}
        <div className={styles.chartsGrid}>
          <div className={styles.chartBox}>
            <h5 className="mb-4" style={{color: 'var(--color-primary)'}}>Weekly Sales Flow</h5>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--rating-color)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--rating-color)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                  <XAxis dataKey="name" stroke="var(--color-secondary)" fontSize={12} />
                  <YAxis stroke="var(--color-secondary)" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--color-primary)' }}
                  />
                  <Area type="monotone" dataKey="sales" stroke="var(--rating-color)" fillOpacity={1} fill="url(#colorSales)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className={styles.chartBox}>
            <h5 className="mb-4" style={{color: 'var(--color-primary)'}}>Top Categories</h5>
             {/* هنا ممكن تضيف Pie Chart أو قائمة بالمنتجات الأكثر مبيعاً */}
             <ul className="list-unstyled">
                <li className="d-flex justify-content-between mb-3">
                    <span style={{color:'var(--color-secondary)'}}>Shoes</span>
                    <span className="fw-bold">60%</span>
                </li>
                <li className="d-flex justify-content-between mb-3">
                    <span style={{color:'var(--color-secondary)'}}>Jerseys</span>
                    <span className="fw-bold">25%</span>
                </li>
             </ul>
          </div>
        </div>
      </main>
    </div>
  );
}