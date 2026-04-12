import { useEffect, useState } from "react";
import api from "../api/axios";

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

  return (
    <section className="alerts-page">
      <div className="alerts-header">
        <div>
          <h2>Low Stock Alerts</h2>
          <p>Products that need attention before restock is required.</p>
        </div>
      </div>

      <div className="alerts-list">
        {loading ? (
          <p>Loading alerts...</p>
        ) : alerts.length === 0 ? (
          <p className="empty-state">No low stock alerts at this time.</p>
        ) : (
          alerts.map((product) => (
            <div key={product._id} className="alert-card">
              <div>
                <p className="alert-title">{product.name}</p>
                <p className="alert-meta">SKU: {product.sku}</p>
              </div>
              <div className="alert-status">
                <span className="status-badge status-danger">Low Stock</span>
                <p>{product.quantity} in stock • min {product.minStock}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
