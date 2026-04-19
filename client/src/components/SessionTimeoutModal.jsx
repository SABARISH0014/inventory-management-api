import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Clock } from "lucide-react";

export default function SessionTimeoutModal({ isOpen, onStayLoggedIn, onLogout, timeRemaining }) {
  const [displayTime, setDisplayTime] = useState(timeRemaining);

  useEffect(() => {
    setDisplayTime(timeRemaining);
  }, [timeRemaining]);

  const minutes = Math.floor(displayTime / 60);
  const seconds = displayTime % 60;

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: { opacity: 0, scale: 0.9, y: 20 },
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className="modal-panel"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ maxWidth: "420px" }}
          >
            <div className="modal-header">
              <motion.div
                variants={pulseVariants}
                animate="pulse"
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <AlertTriangle size={28} style={{ color: "#f59e0b" }} />
                <h3 style={{ margin: 0, color: "#0f172a" }}>Session Timeout Warning</h3>
              </motion.div>
            </div>

            <p className="modal-description">
              Your session will expire due to inactivity. Please click "Stay Logged In" to continue working.
            </p>

            <div
              style={{
                background: "linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%)",
                border: "1px solid rgba(245, 158, 11, 0.2)",
                borderRadius: "16px",
                padding: "20px",
                marginBottom: "24px",
                textAlign: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "8px" }}>
                <Clock size={20} style={{ color: "#d97706" }} />
                <p style={{ margin: 0, fontSize: "14px", color: "#6b7280" }}>Time Remaining</p>
              </div>
              <motion.p
                style={{
                  margin: 0,
                  fontSize: "36px",
                  fontWeight: "800",
                  color: displayTime <= 30 ? "#dc2626" : "#d97706",
                }}
                animate={{ scale: displayTime <= 30 ? [1, 1.05, 1] : 1 }}
                transition={{ duration: 0.5, repeat: displayTime <= 30 ? Infinity : 0 }}
              >
                {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
              </motion.p>
            </div>

            <div className="modal-actions">
              <motion.button
                type="button"
                className="button button-secondary"
                onClick={onLogout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Logout
              </motion.button>
              <motion.button
                type="button"
                className="button button-primary"
                onClick={onStayLoggedIn}
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(79, 70, 229, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                Stay Logged In
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
