import { Link, useLocation } from "react-router-dom";
import { Home, Box, Bell, Truck, History, X } from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: Home },
  { label: "Inventory", path: "/inventory", icon: Box },
  { label: "Suppliers", path: "/suppliers", icon: Truck },
  { label: "Transactions", path: "/transactions", icon: History },
  { label: "Alerts", path: "/alerts", icon: Bell },
];

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

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
          {navItems.map((item) => {
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
      </aside>
    </>
  );
}
