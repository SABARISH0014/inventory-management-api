import { Link, useLocation } from "react-router-dom";
import { Home, Box, Bell, Truck, History, X, Users } from "lucide-react";
import { useEffect, useState } from "react";

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Get user role from localStorage
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const userData = JSON.parse(user);
        setUserRole(userData.role);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  // Define navigation items with role requirements
  const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: Home, roles: ["admin", "manager", "staff"] },
    { label: "Inventory", path: "/inventory", icon: Box, roles: ["admin", "manager", "staff"] },
    { label: "Suppliers", path: "/suppliers", icon: Truck, roles: ["admin", "manager", "staff"] },
    { label: "Transactions", path: "/transactions", icon: History, roles: ["admin", "manager", "staff"] },
    { label: "Alerts", path: "/alerts", icon: Bell, roles: ["admin", "manager"] },
    { label: "Users", path: "/users", icon: Users, roles: ["admin"] },
  ];

  // Filter navigation items based on user role
  const visibleItems = navItems.filter((item) => userRole && item.roles.includes(userRole));

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
        />
      )}

      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <div className="brand-mark">IM</div>
            <div>
              <p>Inventory</p>
              <strong>ECFS 2026</strong>
            </div>
          </div>
          <button
            type="button"
            className="sidebar-close"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {visibleItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${active ? "active" : ""}`}
                onClick={onClose}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User role badge */}
        {userRole && (
          <div
            style={{
              marginTop: "auto",
              padding: "16px",
              borderTop: "1px solid rgba(148, 163, 184, 0.14)",
              fontSize: "12px",
              color: "#6b7280",
              textTransform: "uppercase",
              fontWeight: "600",
              letterSpacing: "0.05em",
            }}
          >
            Role: <span style={{ color: "#8b5cf6" }}>{userRole}</span>
          </div>
        )}
      </aside>
    </>
  );
}
