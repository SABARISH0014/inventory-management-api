import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { ArrowLeft } from "lucide-react";

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

  if (loading) {
    return (
      <section className="detail-page">
        <p>Loading product details...</p>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="detail-page">
        <p>Product not found.</p>
      </section>
    );
  }

  const isLowStock = product.quantity < product.minStock;

  return (
    <section className="detail-page">
      <button
        type="button"
        className="back-button"
        onClick={() => navigate("/inventory")}
      >
        <ArrowLeft size={16} /> Back to Inventory
      </button>

      <div className="detail-header">
        <div>
          <h1>{product.name}</h1>
          <p className="detail-subtitle">SKU: {product.sku}</p>
        </div>
        <div className={`stock-status ${isLowStock ? "low" : "good"}`}>
          {isLowStock ? "Low Stock" : "In Stock"}
        </div>
      </div>

      <div className="detail-grid">
        <div className="detail-card">
          <p className="card-label">Price</p>
          <p className="card-value">₹ {product.price.toLocaleString()}</p>
        </div>
        <div className="detail-card">
          <p className="card-label">Current Quantity</p>
          <p className="card-value">{product.quantity}</p>
        </div>
        <div className="detail-card">
          <p className="card-label">Minimum Stock Level</p>
          <p className="card-value">{product.minStock}</p>
        </div>
        <div className="detail-card">
          <p className="card-label">Total Value</p>
          <p className="card-value">
            ₹ {(product.price * product.quantity).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="detail-section">
        <h2>Transaction History</h2>
        <div className="table-wrapper">
          <table className="inventory-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Quantity</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan="3" className="table-empty">
                    No transactions for this product.
                  </td>
                </tr>
              ) : (
                transactions.map((transaction) => {
                  const date = new Date(transaction.date);
                  return (
                    <tr key={transaction._id}>
                      <td>
                        <span
                          className={`status-badge ${
                            transaction.type === "IN"
                              ? "badge-success"
                              : "badge-warning"
                          }`}
                        >
                          {transaction.type === "IN" ? "Stock In" : "Stock Out"}
                        </span>
                      </td>
                      <td>{transaction.quantity}</td>
                      <td>
                        {date.toLocaleDateString()} {date.toLocaleTimeString()}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
