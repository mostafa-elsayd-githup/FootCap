import { Container } from "react-bootstrap";
import styles from "./loading.module.css";

export default function Loading() {
  return (
    <Container className={styles.wrapper}>
      <div className={styles.container}>
        
        {/* الجزء الأيسر: محاكاة الصور */}
        <div className={styles.imageGallery}>
          <div className={`${styles.imageBox} ${styles.skeleton}`}></div>
          <div className={`${styles.imageBox} ${styles.skeleton}`}></div>
        </div>

        {/* الجزء الأيمن: محاكاة النصوص والأزرار */}
        <div className={styles.infoSection}>
          <div className={`${styles.line} ${styles.title} ${styles.skeleton}`}></div>
          <div className={`${styles.line} ${styles.price} ${styles.skeleton}`}></div>
          
          <div style={{ marginTop: '40px' }}>
             <div className={`${styles.line} ${styles.skeleton}`} style={{width: '40%'}}></div>
             <div style={{ display: 'flex', gap: '10px' }}>
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className={styles.skeleton} style={{width: '60px', height: '60px'}}></div>
                ))}
             </div>
          </div>

          <div className={`${styles.btn} ${styles.skeleton}`}></div>
        </div>
        
      </div>
    </Container>
  );
}