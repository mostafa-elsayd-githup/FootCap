"use client"
import Link from 'next/link';
import styles from './Not_found.module.css'; // تأكد من إضافة التنسيقات في ملف الـ CSS الخاص بك

export default function NotFound() {
  return (
    <div className={styles.notFoundContainer}>
      <h1 className={styles.errorCode}>404</h1>
      <h2 className={styles.notFoundTitle}>عذراً، هذا المنتج غير متاح</h2>
      <p className={styles.notFoundText}>
        يبدو أنك سلكت طريقاً خاطئاً. الصفحة التي تبحث عنها قد تم نقلها أو أنها لم تعد موجودة.
      </p>
      
      <div className={styles.notFoundActions}>
        <Link href="/" className={styles.homeButton}>
          العودة للتسوق
        </Link>
        <Link href="/Components/sport-Componente/sportProcuts/sport_from_gemProducts" className={styles.backButton}>
          مشاهدة كل المنتجات
        </Link>
      </div>
    </div>
  );
}