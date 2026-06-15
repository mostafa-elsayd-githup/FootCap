"use client"
import styles from "./skeletons.module.css";

export default function DashboardSkeleton() {
  const dummyStats = Array(4).fill(null);

  return (
    <div className={styles.dashboard_layout}>

      <div className={styles.stats_grid}>
        {dummyStats.map((_, index) => (
          <div key={index} className={styles.stat_card}>
            <div className={styles.shimmer_item} style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
            <div className={styles.shimmer_item} style={{ width: "50%", height: "14px" }} />
            <div className={styles.shimmer_item} style={{ width: "70%", height: "24px" }} />
          </div>
        ))}
      </div>

      <div className={styles.chart_placeholder}>
        <div className={styles.shimmer_item} style={{ width: "180px", height: "24px", marginBottom: "30px" }} />
        <div className={styles.shimmer_item} style={{ width: "100%", height: "240px" }} />
      </div>
    </div>
  );
}