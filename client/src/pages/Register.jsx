import { useState } from "react";
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

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "staff",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      await api.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });
      navigate("/login", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
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
        <motion.h1 variants={itemVariants}>Create Account</motion.h1>
        <motion.p variants={itemVariants}>Sign up for the inventory management system.</motion.p>
        <motion.form
          onSubmit={handleSubmit}
          className="login-form"
          variants={containerVariants}
        >
          <motion.label variants={itemVariants}>
            Full Name
            <motion.input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              variants={itemVariants}
            />
          </motion.label>
          <motion.label variants={itemVariants}>
            Email
            <motion.input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              variants={itemVariants}
            />
          </motion.label>
          <motion.label variants={itemVariants}>
            Password
            <motion.input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              variants={itemVariants}
            />
          </motion.label>
          <motion.label variants={itemVariants}>
            Confirm Password
            <motion.input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              variants={itemVariants}
            />
          </motion.label>
          <motion.label variants={itemVariants}>
            Role
            <motion.select
              name="role"
              value={formData.role}
              onChange={handleChange}
              variants={itemVariants}
            >
              <option value="staff">Staff</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </motion.select>
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
            {loading ? "Creating account..." : "Create Account"}
          </motion.button>
          <motion.p className="form-link" variants={itemVariants}>
            Already have an account? <Link to="/login">Sign in</Link>
          </motion.p>
        </motion.form>
      </motion.div>
    </div>
  );
}
