'use client'; // ملفات الخطأ يجب أن تكون Client Components

import { useEffect } from 'react';
import styles from './error.module.css'; // استخدم ملف الـ CSS الخاص بك
import Link from 'next/link';

export default function Error({ error, reset }) {
  useEffect(() => {
    // يمكنك تسجيل الخطأ في Console لمتابعته أثناء التطوير
    console.error("API Error:", error);
  }, [error]);

  return (
    <div className={styles.errorWrapper}>
      <div className={styles.errorContent}>
        <h2 className={styles.errorTitle}>نعتذر، واجهنا مشكلة في الاتصال</h2>
        <p className={styles.errorMsg}>
          يبدو أن هناك عطلاً مؤقتاً في السيرفر أو انقطاعاً في الاتصال بالإنترنت. 
          نحن نعمل على إصلاح ذلك الآن.
        </p>
        
        <div className={styles.errorActions}>
          {/* زر يحاول إعادة تحميل المكون فقط دون عمل Refresh للموقع بالكامل */}
          <button className={styles.retryBtn} onClick={() => reset()}>
            إعادة المحاولة
          </button>
          
          <Link href="/" className={styles.homeBtn}>
            العودة للرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}