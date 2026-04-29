'use client'; // ملفات الخطأ لازم تكون Client Components

import Link from 'next/link';
import styles from './error.module.css';

export default function Error({ error, reset }) {
  return (
    <div className={styles.errorContainer}>
      <h2 className={styles.errorTitle}>عذراً، حدث خطأ ما!</h2>
      <p className={styles.errorText}>
        لم نتمكن من تحميل المنتجات حالياً. تأكد من اتصالك بالإنترنت أو حاول مرة أخرى.
      </p>
      
      <div className={styles.errorButtons}>
        {/* زرار يحاول يحمل الصفحة تاني */}
        <button className={styles.retryBtn} onClick={() => reset()}>
          إعادة المحاولة
        </button>
        
        {/* زرار يرجعه للرئيسية */}
        <Link href="/" className={styles.homeBtn}>
          العودة للرئيسية
        </Link>
      </div>
    </div>
  );
}