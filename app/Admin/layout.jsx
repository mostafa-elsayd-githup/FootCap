import Sidebar from "@/Components/dashboardSidbar/sidbar";
import styles from "./layout.module.css";
import NavAction from "@/Components/Navbar/NavAction";
export default function DashboardLayout({ children }) {
  return (
    <div className={styles.layoutContainer}>
      <NavAction />
      <Sidebar />
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
}
