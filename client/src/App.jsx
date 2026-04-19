import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet, useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import SessionTimeoutModal from "./components/SessionTimeoutModal";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import ProductDetail from "./pages/ProductDetail";
import Suppliers from "./pages/Suppliers";
import SupplierDetail from "./pages/SupplierDetail";
import Transactions from "./pages/Transactions";
import Alerts from "./pages/Alerts";
import Users from "./pages/Users";
import "./App.css";

function RequireAuth({ children }) {
  const token = localStorage.getItem("token");
  const [showIdleMessage, setShowIdleMessage] = useState(false);

  useEffect(() => {
    const idleMessage = sessionStorage.getItem("idleLogoutMessage");
    if (idleMessage) {
      setShowIdleMessage(true);
      sessionStorage.removeItem("idleLogoutMessage");
      const timer = setTimeout(() => setShowIdleMessage(false), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      {showIdleMessage && (
        <motion.div
          className="toast-message"
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 9999,
            background: "#fee2e2",
            border: "1px solid #fca5a5",
            color: "#b91c1c",
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          You have been logged out due to inactivity.
        </motion.div>
      )}
      {children}
    </>
  );
}

function RequireRole({ children, allowedRoles }) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const idleTimerRef = useRef(null);
  const warningTimerRef = useRef(null);
  const countdownIntervalRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showTimeoutWarning, setShowTimeoutWarning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(120);

  const IDLE_TIMEOUT = 15 * 60 * 1000; // 15 minutes
  const WARNING_TIME = 2 * 60 * 1000; // Show warning 2 minutes before timeout

  const logout = () => {
    sessionStorage.setItem(
      "idleLogoutMessage",
      "You have been logged out due to inactivity."
    );
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setShowTimeoutWarning(false);
    navigate("/login", { replace: true });
  };

  const handleStayLoggedIn = () => {
    setShowTimeoutWarning(false);
    resetIdleTimer();
  };

  const startCountdown = () => {
    setTimeRemaining(120);
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
    }
    countdownIntervalRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(countdownIntervalRef.current);
          logout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const resetIdleTimer = () => {
    // Clear all existing timers
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }
    if (warningTimerRef.current) {
      clearTimeout(warningTimerRef.current);
    }
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
    }

    // Set warning timer (13 minutes - 2 minutes before logout)
    warningTimerRef.current = setTimeout(() => {
      setShowTimeoutWarning(true);
      startCountdown();
    }, IDLE_TIMEOUT - WARNING_TIME);

    // Set logout timer (15 minutes)
    idleTimerRef.current = setTimeout(logout, IDLE_TIMEOUT);
  };

  useEffect(() => {
    const events = ["mousemove", "keydown", "click", "touchstart"];
    events.forEach((eventName) => window.addEventListener(eventName, resetIdleTimer));

    resetIdleTimer();

    return () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
      if (warningTimerRef.current) {
        clearTimeout(warningTimerRef.current);
      }
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
      events.forEach((eventName) => window.removeEventListener(eventName, resetIdleTimer));
    };
  }, [navigate]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="app-shell">
      <Sidebar isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
      <div className="content-area">
        <Header onMenuToggle={toggleMobileMenu} />
        <main className="content-panel">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      <SessionTimeoutModal
        isOpen={showTimeoutWarning}
        onStayLoggedIn={handleStayLoggedIn}
        onLogout={logout}
        timeRemaining={timeRemaining}
      />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="suppliers/:id" element={<SupplierDetail />} />
          <Route path="transactions" element={<Transactions />} />
          <Route
            path="alerts"
            element={
              <RequireRole allowedRoles={["admin", "manager"]}>
                <Alerts />
              </RequireRole>
            }
          />
          <Route
            path="users"
            element={
              <RequireRole allowedRoles={["admin"]}>
                <Users />
              </RequireRole>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
