import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import api from "../api/axios";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.12,
      when: "beforeChildren",
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [idleLogoutMessage, setIdleLogoutMessage] = useState("");

  useEffect(() => {
    const message = sessionStorage.getItem("idleLogoutMessage");
    if (message) {
      setIdleLogoutMessage(message);
      sessionStorage.removeItem("idleLogoutMessage");
      const timeoutId = setTimeout(() => setIdleLogoutMessage(""), 5000);
      return () => clearTimeout(timeoutId);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Invalid login credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <motion.button
        type="button"
        className="auth-back-button"
        onClick={() => navigate("/")}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft size={16} />
        Back
      </motion.button>
      <motion.div
        className="login-panel"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1 variants={itemVariants}>Sign in</motion.h1>
        <motion.p variants={itemVariants}>Access the inventory management dashboard.</motion.p>
        {idleLogoutMessage ? (
          <motion.div
            className="toast-message toast-warning"
            variants={itemVariants}
          >
            {idleLogoutMessage}
          </motion.div>
        ) : null}
        <motion.form
          onSubmit={handleSubmit}
          className="login-form"
          variants={containerVariants}
        >
          <motion.label variants={itemVariants}>
            Email
            <motion.input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              variants={itemVariants}
            />
          </motion.label>
          <motion.label variants={itemVariants}>
            Password
            <motion.input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              variants={itemVariants}
            />
          </motion.label>
          {error ? <motion.p className="form-error" variants={itemVariants}>{error}</motion.p> : null}
          <motion.button
            type="submit"
            className="button button-primary"
            disabled={loading}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? "Signing in..." : "Sign in"}
          </motion.button>
          <motion.p className="form-link" variants={itemVariants}>
            Don't have an account? <Link to="/register">Create one</Link>
          </motion.p>
        </motion.form>
      </motion.div>
    </div>
  );
}
