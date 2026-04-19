import { useLocation, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";

const titles = {
  "/dashboard": "Dashboard",
  "/inventory": "Inventory",
  "/products/:id": "Product Details",
  "/suppliers": "Suppliers",
  "/suppliers/:id": "Supplier Details",
  "/transactions": "Transactions",
  "/alerts": "Alerts",
  "/users": "User Management",
};

function getTitle(path) {
  const productMatch = path.match(/^\/products\/[a-zA-Z0-9]+$/);
  if (productMatch) return "Product Details";

  const supplierMatch = path.match(/^\/suppliers\/[a-zA-Z0-9]+$/);
  if (supplierMatch) return "Supplier Details";

  return titles[path] || "Inventory Management";
}

// Get role badge color
function getRoleColor(role) {
  switch (role) {
    case "admin":
      return "#d946ef"; // Pink
    case "manager":
      return "#8b5cf6"; // Purple
    case "staff":
      return "#3b82f6"; // Blue
    default:
      return "#6b7280"; // Gray
  }
}

export default function Header({ onMenuToggle }) {
  const location = useLocation();
  const navigate = useNavigate();
  const title = getTitle(location.pathname);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  return (
    <header className="page-header">
      <div className="header-left">
        <button
          type="button"
          className="menu-toggle"
          onClick={onMenuToggle}
          aria-label="Toggle menu"
        >
          <Menu size={20} />
        </button>
        <div>
          <p className="page-label">{title}</p>
        </div>
      </div>
      <div className="profile-panel">
        <div>
          <p className="profile-name">{user.name || "User"}</p>
          <p
            className="profile-role"
            style={{
              color: getRoleColor(user.role),
              textTransform: "capitalize",
              fontWeight: "600",
            }}
          >
            {user.role || "Staff"}
          </p>
        </div>
        <button type="button" className="logout-button" onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
}
