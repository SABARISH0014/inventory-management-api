import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import StockModal from "../components/StockModal";
import ProductModal from "../components/ProductModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import TransactionModal from "../components/TransactionModal";
import { Edit2, Trash2 } from "lucide-react";

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
    } catch (error) {
      const message = error.response?.data?.message || "Unable to update stock.";
      setStatusMessage(message);
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
    }
  };

  return (
    <section className="inventory-page">
      <div className="inventory-header">
        <div>
          <h2>Inventory</h2>
          <p>Manage stock and product availability.</p>
        </div>
        <div className="header-buttons">
          <button type="button" className="button button-primary" onClick={() => openProductModal()}>
            Add Product
          </button>
          <button type="button" className="button button-secondary" onClick={() => setTransactionModalOpen(true)}>
            New Transaction
          </button>
        </div>
      </div>

      {statusMessage ? <p className="status-message">{statusMessage}</p> : null}

      <div className="table-wrapper">
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
                  Loading products...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan="6" className="table-empty">
                  No products available.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product._id}
                  className={product.quantity < product.minStock ? "row-low-stock" : ""}
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/products/${product._id}`)}
                >
                  <td>{product.name}</td>
                  <td>{product.sku}</td>
                  <td>₹ {product.price.toLocaleString()}</td>
                  <td>{product.quantity}</td>
                  <td>{product.minStock}</td>
                  <td className="action-cell" onClick={(e) => e.stopPropagation()}>
                    <button type="button" className="button button-secondary button-small" onClick={() => openStockModal(product, "in")}>Stock In</button>
                    <button type="button" className="button button-outline button-small" onClick={() => openStockModal(product, "out")}>Stock Out</button>
                    <button type="button" className="button button-icon" title="Edit" onClick={() => openProductModal(product)}>
                      <Edit2 size={16} />
                    </button>
                    <button type="button" className="button button-icon button-danger" title="Delete" onClick={() => openDeleteModal(product)}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

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
