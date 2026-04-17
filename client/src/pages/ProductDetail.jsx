import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios";
import { ArrowLeft, Package, DollarSign, AlertTriangle, TrendingUp, Calendar } from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const [productRes, transactionsRes] = await Promise.all([
          api.get(`/products/${id}`),
          api.get(`/transactions/${id}`),
        ]);
        setProduct(productRes.data);
        setTransactions(transactionsRes.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
  }, [id]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
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

  const tableVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.4,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  if (loading) {
    return (
      <section className="product-detail-page">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{ textAlign: "center", padding: "80px 20px" }}
        >
          <motion.div
            className="loading-spinner"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            style={{ margin: "0 auto 16px", width: "50px", height: "50px" }}
          />
          <p style={{ fontSize: "16px", color: "#6b7280" }}>Loading product details...</p>
        </motion.div>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="product-detail-page">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          style={{ textAlign: "center", padding: "80px 20px" }}
        >
          <Package size={56} style={{ marginBottom: "16px", opacity: 0.2 }} />
          <p style={{ fontSize: "18px", color: "#6b7280" }}>Product not found.</p>
        </motion.div>
      </section>
    );
  }

  const isLowStock = product.quantity < product.minStock;
  const stockPercentage = (product.quantity / (product.minStock * 2)) * 100;
  const totalValue = product.price * product.quantity;
  const stockInCount = transactions.filter(t => t.type === "IN").length;
  const stockOutCount = transactions.filter(t => t.type === "OUT").length;

  return (
    <section className="product-detail-page">
      {/* Back Button */}
      <motion.button
        type="button"
        className="back-button"
        onClick={() => navigate("/inventory")}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        whileHover={{ x: -4, backgroundColor: "rgba(79, 70, 229, 0.08)" }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft size={16} /> Back to Inventory
      </motion.button>

      {/* Hero Section */}
      <motion.div
        className="product-hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="hero-content">
          <div className="hero-icon">
            <Package size={40} />
          </div>
          <div className="hero-text">
            <h1>{product.name}</h1>
            <p className="hero-sku">SKU: {product.sku}</p>
          </div>
        </div>
        <motion.div
          className={`stock-badge ${isLowStock ? "low" : "good"}`}
          variants={pulseVariants}
          animate="pulse"
        >
          <span className="badge-dot"></span>
          {isLowStock ? "Low Stock" : "In Stock"}
        </motion.div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        className="product-stats-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="stat-card primary" variants={itemVariants}>
          <div className="stat-icon">
            <DollarSign size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Unit Price</p>
            <p className="stat-value">₹ {product.price.toLocaleString()}</p>
          </div>
        </motion.div>

        <motion.div className="stat-card secondary" variants={itemVariants}>
          <div className="stat-icon">
            <Package size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Current Stock</p>
            <p className="stat-value">{product.quantity}</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${Math.min(stockPercentage, 100)}%` }}></div>
            </div>
          </div>
        </motion.div>

        <motion.div className="stat-card tertiary" variants={itemVariants}>
          <div className="stat-icon">
            <AlertTriangle size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Min Stock Level</p>
            <p className="stat-value">{product.minStock}</p>
          </div>
        </motion.div>

        <motion.div className="stat-card accent" variants={itemVariants}>
          <div className="stat-icon">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Value</p>
            <p className="stat-value">₹ {totalValue.toLocaleString()}</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Details Section */}
      <motion.div
        className="product-details-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2>Product Information</h2>
        <div className="details-grid">
          <div className="detail-item">
            <span className="detail-label">Product Name</span>
            <span className="detail-value">{product.name}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">SKU</span>
            <span className="detail-value">{product.sku}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Unit Price</span>
            <span className="detail-value">₹ {product.price.toLocaleString()}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Stock Status</span>
            <span className={`detail-value status ${isLowStock ? "low" : "good"}`}>
              {isLowStock ? "⚠️ Low Stock" : "✓ In Stock"}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Transaction Stats */}
      <motion.div
        className="transaction-stats"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
      >
        <div className="stat-box in">
          <div className="stat-number">{stockInCount}</div>
          <div className="stat-text">Stock In</div>
        </div>
        <div className="stat-box out">
          <div className="stat-number">{stockOutCount}</div>
          <div className="stat-text">Stock Out</div>
        </div>
        <div className="stat-box total">
          <div className="stat-number">{transactions.length}</div>
          <div className="stat-text">Total Transactions</div>
        </div>
      </motion.div>

      {/* Transaction History */}
      <motion.div
        className="transaction-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="section-header">
          <h2>
            <Calendar size={20} style={{ marginRight: "8px" }} />
            Transaction History
          </h2>
          <span className="transaction-count">{transactions.length} transactions</span>
        </div>

        <motion.div
          className="transaction-table-wrapper"
          variants={tableVariants}
          initial="hidden"
          animate="visible"
        >
          {transactions.length === 0 ? (
            <motion.div
              className="empty-transaction"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Calendar size={48} style={{ opacity: 0.2, marginBottom: "12px" }} />
              <p>No transactions recorded for this product.</p>
            </motion.div>
          ) : (
            <table className="transaction-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Quantity</th>
                  <th>Date & Time</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => {
                  const date = new Date(transaction.date);
                  const isStockIn = transaction.type === "IN";
                  return (
                    <motion.tr key={transaction._id} variants={rowVariants}>
                      <td>
                        <span className={`transaction-badge ${isStockIn ? "in" : "out"}`}>
                          {isStockIn ? "📥 Stock In" : "📤 Stock Out"}
                        </span>
                      </td>
                      <td>
                        <span className={`quantity-badge ${isStockIn ? "in" : "out"}`}>
                          {isStockIn ? "+" : "-"}{transaction.quantity}
                        </span>
                      </td>
                      <td className="date-cell">
                        {date.toLocaleDateString()} • {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
