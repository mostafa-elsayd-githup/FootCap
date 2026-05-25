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
  PieChart,
  Pie,
  Cell,
} from "recharts";
export default function Dashboard({ total, allUsers, orders, finalData }) {
  const totalmoney = new Intl.NumberFormat("en", {
    notation: "compact",
    style: "currency",
    currency: "EGP",
    
  }).format(total);

  const data = [
    { name: "Shoes", value: 20, color: "#3b82f6" }, // أزرق مثلاً
    { name: "Jerseys", value: 25, color: "#10b981" }, // أخضر
    { name: "Jackets", value: 15, color: "#f59e0b" }, // برتقالي
  ];
  return (
    <div className={styles.adminLayout}>
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
       <div className={styles.glassCard}>
      <h3 className={styles.cardTitle}>Top Categories</h3>
      
      <ResponsiveContainer width="100%" height="70%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={65}   
            outerRadius={85}
            paddingAngle={6}   
            cornerRadius={8}   
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color}
                style={{
                  filter: `drop-shadow(0px 0px 8px ${entry.color})`, 
                  cursor: 'pointer'
                }}
              />
            ))}
          </Pie>
          
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "rgba(30, 30, 30, 0.85)", 
              backdropFilter: "blur(8px)",
              borderRadius: "12px", 
              border: "1px solid rgba(255, 255, 255, 0.1)", 
              color: "#fff",
              boxShadow: "0 4px 20px rgba(0,0,0,0.4)"
            }} 
          />
        </PieChart>
      </ResponsiveContainer>
      <div className={styles.legendContainer}>
        {data.map((entry, index) => (
          <div key={index} className={styles.legendItem}>
            <span 
              className={styles.legendDot} 
              style={{ backgroundColor: entry.color, color: entry.color }}
            />
            {entry.name}
          </div>
        ))}
      </div>
    </div>
        </div>
      </main>
    </div>
  );
}
