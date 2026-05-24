"use client"

import styles from "./skeletons.module.css";

export default function BlogSkeleton() {
  const dummyBlogs = Array(3).fill(null);

  return (
    <div className={styles.blog_grid}>
      {dummyBlogs.map((_, index) => (
        <div key={index} className={styles.blog_post}>
          {/* صورة المقال */}
          <div className={`${styles.shimmer_item} ${styles.blog_img}`} />
          
          {/* تفاصيل المقال (العنوان والوصف) */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
            <div className={`${styles.shimmer_item} ${styles.blog_meta}`} />
            <div className={`${styles.shimmer_item} ${styles.blog_title}`} />
            <div className={`${styles.shimmer_item} ${styles.blog_desc}`} />
            <div className={`${styles.shimmer_item} ${styles.blog_desc}`} style={{ width: "90%" }} />
          </div>
        </div>
      ))}
    </div>
  );
}