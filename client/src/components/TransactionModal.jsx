import { useEffect, useState } from "react";
import api from "../api/axios";

export default function TransactionModal({ open, onClose, onSuccess }) {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    productID: "",
    quantity: "",
    type: "IN",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
        setProducts(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (open) {
      fetchProducts();
      setFormData({ productID: "", quantity: "", type: "IN" });
      setError("");
    }
  }, [open]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint = formData.type === "IN" ? "/stock/in" : "/stock/out";
      await api.post(endpoint, {
        productID: formData.productID,
        quantity: parseInt(formData.quantity),
        type: formData.type,
      });
      setFormData({ productID: "", quantity: "", type: "IN" });
      onClose();
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create transaction");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-panel" onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <h3>Create Transaction</h3>
          <button type="button" className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <form className="modal-form" onSubmit={handleSubmit}>
          <label>
            Product
            <select
              name="productID"
              value={formData.productID}
              onChange={handleChange}
              required
            >
              <option value="">Select a product</option>
              {products.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.name} (SKU: {product.sku})
                </option>
              ))}
            </select>
          </label>
          <label>
            Type
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="IN">Stock In</option>
              <option value="OUT">Stock Out</option>
            </select>
          </label>
          <label>
            Quantity
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              required
            />
          </label>
          {error ? <p className="form-error">{error}</p> : null}
          <div className="modal-actions">
            <button type="button" className="button button-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="button button-primary" disabled={loading}>
              {loading ? "Creating..." : "Create Transaction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
