import NavAction from "@/Components/Navbar/NavAction";
import "bootstrap/dist/css/bootstrap.min.css";
export default function AuthLayout({ children }) {
  return (
    <div className="auth-container">
      <NavAction />

      {children}
    </div>
  );
}
