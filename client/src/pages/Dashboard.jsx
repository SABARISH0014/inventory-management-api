import { useEffect, useState } from "react";
import api from "../api/axios";
import TransactionModal from "../components/TransactionModal";

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [lowStockCount, setLowStockCount] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [transactionModalOpen, setTransactionModalOpen] = useState(false);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const summaryRes = await api.get("/reports/summary");
        setSummary(summaryRes.data);
        setLowStockCount(summaryRes.data.lowStockCount);
        setTotalValue(summaryRes.data.totalValue);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  return (
    <section className="dashboard-page">
      <div className="dashboard-header">
        <h2>Overview</h2>
        <button
          type="button"
          className="button button-secondary"
          onClick={() => setTransactionModalOpen(true)}
        >
          New Transaction
        </button>
      </div>
      <div className="dashboard-grid">
        <article className="metric-card">
          <p className="metric-label">Total Products</p>
          <p className="metric-value">{loading ? "—" : summary?.totalProducts ?? 0}</p>
        </article>
        <article className="metric-card">
          <p className="metric-label">Total Quantity</p>
          <p className="metric-value">{loading ? "—" : summary?.totalQuantity ?? 0}</p>
        </article>
        <article className="metric-card">
          <p className="metric-label">Total Value</p>
          <p className="metric-value">{loading ? "—" : `₹ ${totalValue.toLocaleString()}`}</p>
        </article>
        <article className="metric-card metric-alert">
          <p className="metric-label">Low Stock Items</p>
          <p className="metric-value">{loading ? "—" : lowStockCount}</p>
        </article>
      </div>
      <div className="dashboard-note">
        <p>Review inventory health and stock readiness at a glance.</p>
      </div>

      <TransactionModal
        open={transactionModalOpen}
        onClose={() => setTransactionModalOpen(false)}
        onSuccess={() => {}}
      />
    </section>
  );
}
