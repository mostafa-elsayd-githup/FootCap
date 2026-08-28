"use client";
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
export default function Dashboard({ total, allUsers, orders, finalData, Donut_Char }) {

  
  const totalmoney = new Intl.NumberFormat("en", {
    notation: "compact",
    style: "currency",
    currency: "EGP",
    
  }).format(total);

  return (
    <div className={styles.adminLayout}>
      <main className={styles.content}>
        <div className={styles.titlepage}>
          <h1 className="fw-bold" style={{ color: "var(--color-primary)" }}>
            Analytics Overview
          </h1>
        </div>

        <div className={styles.topCards}>
          <div className={styles.card}>
            <span className={styles.cardTitle}>Total Revenue</span>
            <span className={styles.cardValue}>{totalmoney}</span>
          </div>
          <div className={styles.card}>
            <span className={styles.cardTitle}>Active Users</span>
            <span className={styles.cardValue}>
              {allUsers?.length.toLocaleString()}
            </span>
          </div>
          <div className={styles.card}>
            <span className={styles.cardTitle}>Orders</span>
            <span className={styles.cardValue}>{orders?.toLocaleString()}</span>
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
      
     <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={Donut_Char}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={75}
              paddingAngle={6}
              dataKey="value"
              cornerRadius={8}
              stroke="none"
            >
              {Donut_Char.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color} 
                  style={{
                    filter: `drop-shadow(0px 0px 6px ${entry.color}80)`
                  }}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--bg-card, #212429)",
                borderColor: "var(--border-color, #2b2e33)",
                color: "var(--color-primary, #fff)",
                borderRadius: "10px",
                fontSize: "12px"
              }}
              formatter={(value) => [`${value} Sales`, "Quantity"]}
            />
          </PieChart>
        </ResponsiveContainer>
      <div className={styles.legendContainer}>
        {Donut_Char.map((entry, index) => (
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
