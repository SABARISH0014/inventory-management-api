import { Link, useLocation } from "react-router-dom";
import { Home, Box, Bell, Truck, History } from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: Home },
  { label: "Inventory", path: "/inventory", icon: Box },
  { label: "Suppliers", path: "/suppliers", icon: Truck },
  { label: "Transactions", path: "/transactions", icon: History },
  { label: "Alerts", path: "/alerts", icon: Bell },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-mark">IM</div>
        <div>
          <p>Inventory</p>
          <strong>ECFS 2026</strong>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${active ? "active" : ""}`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
