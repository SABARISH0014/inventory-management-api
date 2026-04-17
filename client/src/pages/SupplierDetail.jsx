import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios";
import { ArrowLeft, Building, Mail, Phone, MapPin, Package, TrendingUp } from "lucide-react";

export default function SupplierDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSupplierData = async () => {
      try {
        const supplierRes = await api.get(`/suppliers/${id}`);
        setSupplier(supplierRes.data);

        const productsRes = await api.get("/products");
        const supplierProducts = productsRes.data.filter(
          (p) => p.supplierId?._id === id || p.supplierId === id
        );
        setProducts(supplierProducts);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSupplierData();
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
      <section className="supplier-detail-page">
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
          <p style={{ fontSize: "16px", color: "#6b7280" }}>Loading supplier details...</p>
        </motion.div>
      </section>
    );
  }

  if (!supplier) {
    return (
      <section className="supplier-detail-page">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          style={{ textAlign: "center", padding: "80px 20px" }}
        >
          <Building size={56} style={{ marginBottom: "16px", opacity: 0.2 }} />
          <p style={{ fontSize: "18px", color: "#6b7280" }}>Supplier not found.</p>
        </motion.div>
      </section>
    );
  }

  const totalProductValue = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);
  const lowStockProducts = products.filter(p => p.quantity < p.minStock).length;

  return (
    <section className="supplier-detail-page">
      {/* Back Button */}
      <motion.button
        type="button"
        className="back-button"
        onClick={() => navigate("/suppliers")}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        whileHover={{ x: -4, backgroundColor: "rgba(79, 70, 229, 0.08)" }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft size={16} /> Back to Suppliers
      </motion.button>

      {/* Hero Section */}
      <motion.div
        className="supplier-hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="hero-content">
          <div className="hero-icon">
            <Building size={40} />
          </div>
          <div className="hero-text">
            <h1>{supplier.name}</h1>
            <p className="hero-subtitle">Supplier Partner</p>
          </div>
        </div>
        <div className="hero-badge">
          <span className="badge-dot active"></span>
          Active
        </div>
      </motion.div>

      {/* Contact Cards Grid */}
      <motion.div
        className="contact-cards-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="contact-card email" variants={itemVariants}>
          <div className="contact-icon">
            <Mail size={24} />
          </div>
          <div className="contact-content">
            <p className="contact-label">Email</p>
            <p className="contact-value">{supplier.email}</p>
          </div>
        </motion.div>

        <motion.div className="contact-card phone" variants={itemVariants}>
          <div className="contact-icon">
            <Phone size={24} />
          </div>
          <div className="contact-content">
            <p className="contact-label">Phone</p>
            <p className="contact-value">{supplier.phone || "Not provided"}</p>
          </div>
        </motion.div>

        {supplier.address && (
          <motion.div className="contact-card address" variants={itemVariants}>
            <div className="contact-icon">
              <MapPin size={24} />
            </div>
            <div className="contact-content">
              <p className="contact-label">Address</p>
              <p className="contact-value">{supplier.address}</p>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Supplier Stats */}
      <motion.div
        className="supplier-stats"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="stat-box products">
          <div className="stat-number">{products.length}</div>
          <div className="stat-text">Products Supplied</div>
        </div>
        <div className="stat-box value">
          <div className="stat-number">₹ {(totalProductValue / 100000).toFixed(1)}L</div>
          <div className="stat-text">Total Value</div>
        </div>
        <div className="stat-box alert">
          <div className="stat-number">{lowStockProducts}</div>
          <div className="stat-text">Low Stock Items</div>
        </div>
      </motion.div>

      {/* Supplier Information */}
      <motion.div
        className="supplier-info-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
      >
        <h2>Contact Information</h2>
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Company Name</span>
            <span className="info-value">{supplier.name}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Email Address</span>
            <span className="info-value">{supplier.email}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Phone Number</span>
            <span className="info-value">{supplier.phone || "—"}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Location</span>
            <span className="info-value">{supplier.address || "—"}</span>
          </div>
        </div>
      </motion.div>

      {/* Associated Products */}
      <motion.div
        className="products-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="section-header">
          <h2>
            <Package size={20} style={{ marginRight: "8px" }} />
            Associated Products
          </h2>
          <span className="product-count">{products.length} products</span>
        </div>

        <motion.div
          className="products-table-wrapper"
          variants={tableVariants}
          initial="hidden"
          animate="visible"
        >
          {products.length === 0 ? (
            <motion.div
              className="empty-products"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Package size={48} style={{ opacity: 0.2, marginBottom: "12px" }} />
              <p>No products from this supplier.</p>
            </motion.div>
          ) : (
            <table className="products-table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>SKU</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  const isLowStock = product.quantity < product.minStock;
                  const productValue = product.price * product.quantity;
                  return (
                    <motion.tr
                      key={product._id}
                      variants={rowVariants}
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(`/products/${product._id}`)}
                      whileHover={{ backgroundColor: "rgba(79, 70, 229, 0.04)" }}
                    >
                      <td>
                        <div className="product-name-cell">
                          <span className="product-name">{product.name}</span>
                          {isLowStock && <span className="low-stock-indicator">⚠️ Low</span>}
                        </div>
                      </td>
                      <td>
                        <span className="sku-badge">{product.sku}</span>
                      </td>
                      <td>
                        <span className="price-value">₹ {product.price.toLocaleString()}</span>
                      </td>
                      <td>
                        <div className="stock-cell">
                          <span className={`stock-value ${isLowStock ? "low" : "good"}`}>
                            {product.quantity}
                          </span>
                          <span className="min-stock">min {product.minStock}</span>
                        </div>
                      </td>
                      <td>
                        <span className="value-cell">₹ {productValue.toLocaleString()}</span>
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
