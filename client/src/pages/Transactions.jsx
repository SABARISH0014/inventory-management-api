import { useEffect, useState } from "react";
import api from "../api/axios";
import TransactionModal from "../components/TransactionModal";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [transactionModalOpen, setTransactionModalOpen] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await api.get("/reports/transactions");
        setTransactions(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  const getTypeLabel = (type) => {
    return type === "IN" ? "Stock In" : "Stock Out";
  };

  const getTypeClass = (type) => {
    return type === "IN" ? "badge-success" : "badge-warning";
  };

  return (
    <section className="transactions-page">
      <div className="inventory-header">
        <div>
          <h2>Transaction History</h2>
          <p>View all stock movements and transactions.</p>
        </div>
        <button
          type="button"
          className="button button-primary"
          onClick={() => setTransactionModalOpen(true)}
        >
          New Transaction
        </button>
      </div>

      <div className="table-wrapper">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="table-loading">
                  Loading transactions...
                </td>
              </tr>
            ) : transactions.length === 0 ? (
              <tr>
                <td colSpan="4" className="table-empty">
                  No transactions recorded.
                </td>
              </tr>
            ) : (
              transactions.map((transaction) => {
                const productName = transaction.productID?.name || "Unknown";
                const date = new Date(transaction.date);
                return (
                  <tr key={transaction._id}>
                    <td>{productName}</td>
                    <td>
                      <span className={`status-badge ${getTypeClass(transaction.type)}`}>
                        {getTypeLabel(transaction.type)}
                      </span>
                    </td>
                    <td>{transaction.quantity}</td>
                    <td>{date.toLocaleDateString()} {date.toLocaleTimeString()}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <TransactionModal
        open={transactionModalOpen}
        onClose={() => setTransactionModalOpen(false)}
        onSuccess={() => {
          const refreshTransactions = async () => {
            try {
              const response = await api.get("/reports/transactions");
              setTransactions(response.data);
            } catch (error) {
              console.error(error);
            }
          };
          refreshTransactions();
        }}
      />
    </section>
  );
}
