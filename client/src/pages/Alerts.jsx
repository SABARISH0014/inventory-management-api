import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api/axios";
import { AlertTriangle, Bell } from "lucide-react";

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await api.get("/alerts/low-stock");
        setAlerts(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAlerts();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const alertVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const pulseVariants = {
    pulse: {
      opacity: [1, 0.6, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="alerts-page" style={{ width: '100%', maxWidth: '100%' }}>
      <motion.div
        className="alerts-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <h2>
            <Bell size={24} style={{ marginRight: "8px", verticalAlign: "middle" }} />
            Low Stock Alerts
          </h2>
          <p>Products that need attention before restock is required.</p>
        </div>
      </motion.div>

      <motion.div
        className="alerts-list"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            style={{ textAlign: "center", padding: "40px 20px" }}
          >
            <motion.div
              className="loading-spinner"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              style={{ margin: "0 auto 16px" }}
            />
            <p>Loading alerts...</p>
          </motion.div>
        ) : alerts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            style={{ textAlign: "center", padding: "60px 20px" }}
          >
            <AlertTriangle size={48} style={{ marginBottom: "16px", opacity: 0.2 }} />
            <p className="empty-state">No low stock alerts at this time. ✨</p>
          </motion.div>
        ) : (
          alerts.map((product) => (
            <motion.div
              key={product._id}
              className="alert-card"
              variants={alertVariants}
              whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(15, 23, 42, 0.12)" }}
            >
              <div>
                <p className="alert-title">{product.name}</p>
                <p className="alert-meta">SKU: {product.sku}</p>
              </div>
              <div className="alert-status">
                <motion.span
                  className="status-badge status-danger"
                  variants={pulseVariants}
                  animate="pulse"
                >
                  Low Stock
                </motion.span>
                <p>{product.quantity} in stock • min {product.minStock}</p>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </section>
  );
}
