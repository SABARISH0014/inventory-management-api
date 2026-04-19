import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios";
import StockModal from "../components/StockModal";
import ProductModal from "../components/ProductModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import TransactionModal from "../components/TransactionModal";
import { Edit2, Trash2, Plus, Package } from "lucide-react";

export default function Inventory() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalType, setModalType] = useState("in");
  const [stockModalOpen, setStockModalOpen] = useState(false);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [transactionModalOpen, setTransactionModalOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(true);
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

  const loadProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const openStockModal = (product, type) => {
    setSelectedProduct(product);
    setModalType(type);
    setStockModalOpen(true);
    setStatusMessage("");
  };

  const closeStockModal = () => {
    setStockModalOpen(false);
    setSelectedProduct(null);
  };

  const handleConfirm = async (quantity) => {
    if (!selectedProduct) return;

    try {
      const endpoint = modalType === "in" ? "/stock/in" : "/stock/out";
      await api.post(endpoint, {
        productID: selectedProduct._id,
        quantity,
      });
      setStatusMessage(`Updated stock for ${selectedProduct.name}.`);
      closeStockModal();
      loadProducts();
      setTimeout(() => setStatusMessage(""), 3000);
    } catch (error) {
      const message = error.response?.data?.message || "Unable to update stock.";
      setStatusMessage(message);
      setTimeout(() => setStatusMessage(""), 3000);
    }
  };

  const openProductModal = (product = null) => {
    setSelectedProduct(product);
    setProductModalOpen(true);
  };

  const closeProductModal = () => {
    setProductModalOpen(false);
    setSelectedProduct(null);
  };

  const handleSaveProduct = async (formData) => {
    if (selectedProduct) {
      await api.put(`/products/${selectedProduct._id}`, formData);
      setStatusMessage("Product updated successfully.");
    } else {
      await api.post("/products", formData);
      setStatusMessage("Product created successfully.");
    }
    closeProductModal();
    loadProducts();
    setTimeout(() => setStatusMessage(""), 3000);
  };

  const openDeleteModal = (product) => {
    setSelectedProduct(product);
    setDeleteModalOpen(true);
  };

  const handleDeleteProduct = async () => {
    if (selectedProduct) {
      await api.delete(`/products/${selectedProduct._id}`);
      setStatusMessage("Product deleted successfully.");
      setSelectedProduct(null);
      loadProducts();
      setTimeout(() => setStatusMessage(""), 3000);
    }
  };

  const tableVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
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

  const buttonVariants = {
    whileHover: { scale: 1.08, y: -2 },
    whileTap: { scale: 0.95 },
  };

  // Check if user can create/edit/delete products
  const canCreateProduct = userRole && ["admin", "manager"].includes(userRole);
  const canEditProduct = userRole && ["admin", "manager"].includes(userRole);
  const canDeleteProduct = userRole === "admin";
  const canRemoveStock = userRole && ["admin", "manager"].includes(userRole);

  return (
    <section className="inventory-page" style={{ width: "100%", maxWidth: "100%" }}>
      <motion.div
        className="inventory-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <h2>
            <Package size={24} style={{ marginRight: "8px", verticalAlign: "middle" }} />
            Inventory
          </h2>
          <p>Manage stock and product availability.</p>
        </div>
        <div className="header-buttons">
          {canCreateProduct && (
            <motion.button
              type="button"
              className="button button-primary"
              onClick={() => openProductModal()}
              variants={buttonVariants}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(79, 70, 229, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus size={16} style={{ marginRight: "8px" }} />
              Add Product
            </motion.button>
          )}
          {canRemoveStock && (
            <motion.button
              type="button"
              className="button button-secondary"
              onClick={() => setTransactionModalOpen(true)}
              variants={buttonVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              New Transaction
            </motion.button>
          )}
        </div>
      </motion.div>

      {statusMessage && (
        <motion.p
          className="status-message success"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
        >
          {statusMessage}
        </motion.p>
      )}

      <motion.div
        className="table-wrapper"
        variants={tableVariants}
        initial="hidden"
        animate="visible"
      >
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>SKU</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Min Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="table-loading">
                  <motion.div
                    className="loading-spinner"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Loading products...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan="6" className="table-empty">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Package size={40} style={{ marginBottom: "12px", opacity: 0.3 }} />
                    <p>No products available.</p>
                  </motion.div>
                </td>
              </tr>
            ) : (
              products.map((product, index) => (
                <motion.tr
                  key={product._id}
                  variants={rowVariants}
                  className={product.quantity < product.minStock ? "row-low-stock" : ""}
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/products/${product._id}`)}
                  whileHover={{ backgroundColor: "rgba(79, 70, 229, 0.04)" }}
                >
                  <td data-label="Name">{product.name}</td>
                  <td data-label="SKU">{product.sku}</td>
                  <td data-label="Price">₹ {product.price.toLocaleString()}</td>
                  <td data-label="Quantity">{product.quantity}</td>
                  <td data-label="Min Stock">{product.minStock}</td>
                  <td className="action-cell" data-label="Actions" onClick={(e) => e.stopPropagation()}>
                    <motion.button
                      type="button"
                      className="button button-secondary button-small"
                      onClick={() => openStockModal(product, "in")}
                      variants={buttonVariants}
                      whileHover={{ scale: 1.08, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Stock In
                    </motion.button>
                    {canRemoveStock && (
                      <motion.button
                        type="button"
                        className="button button-outline button-small"
                        onClick={() => openStockModal(product, "out")}
                        variants={buttonVariants}
                        whileHover={{ scale: 1.08, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Stock Out
                      </motion.button>
                    )}
                    {canEditProduct && (
                      <motion.button
                        type="button"
                        className="button button-icon"
                        title="Edit"
                        onClick={() => openProductModal(product)}
                        variants={buttonVariants}
                        whileHover={{ scale: 1.1, backgroundColor: "rgba(79, 70, 229, 0.1)" }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Edit2 size={16} />
                      </motion.button>
                    )}
                    {canDeleteProduct && (
                      <motion.button
                        type="button"
                        className="button button-icon button-danger"
                        title="Delete"
                        onClick={() => openDeleteModal(product)}
                        variants={buttonVariants}
                        whileHover={{ scale: 1.1, backgroundColor: "rgba(239, 68, 68, 0.1)" }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Trash2 size={16} />
                      </motion.button>
                    )}
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </motion.div>

      <StockModal
        open={stockModalOpen}
        onClose={closeStockModal}
        product={selectedProduct}
        type={modalType}
        onSubmit={handleConfirm}
      />

      <ProductModal
        open={productModalOpen}
        onClose={closeProductModal}
        product={selectedProduct}
        onSubmit={handleSaveProduct}
      />

      <DeleteConfirmModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Product"
        onConfirm={handleDeleteProduct}
      />

      <TransactionModal
        open={transactionModalOpen}
        onClose={() => setTransactionModalOpen(false)}
        onSuccess={loadProducts}
      />
    </section>
  );
}
