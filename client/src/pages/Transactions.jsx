import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api/axios";
import TransactionModal from "../components/TransactionModal";
import { History, Plus } from "lucide-react";

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

  return (
    <section className="transactions-page">
      <motion.div
        className="inventory-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <h2>
            <History size={24} style={{ marginRight: "8px", verticalAlign: "middle" }} />
            Transaction History
          </h2>
          <p>View all stock movements and transactions.</p>
        </div>
        <motion.button
          type="button"
          className="button button-primary"
          onClick={() => setTransactionModalOpen(true)}
          whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(79, 70, 229, 0.3)" }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={16} style={{ marginRight: "8px" }} />
          New Transaction
        </motion.button>
      </motion.div>

      <motion.div
        className="table-wrapper"
        variants={tableVariants}
        initial="hidden"
        animate="visible"
      >
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
                  <motion.div
                    className="loading-spinner"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Loading transactions...
                </td>
              </tr>
            ) : transactions.length === 0 ? (
              <tr>
                <td colSpan="4" className="table-empty">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <History size={40} style={{ marginBottom: "12px", opacity: 0.3 }} />
                    <p>No transactions recorded.</p>
                  </motion.div>
                </td>
              </tr>
            ) : (
              transactions.map((transaction) => {
                const productName = transaction.productID?.name || "Unknown";
                const date = new Date(transaction.date);
                return (
                  <motion.tr key={transaction._id} variants={rowVariants}>
                    <td data-label="Product">{productName}</td>
                    <td data-label="Type">
                      <span className={`status-badge ${getTypeClass(transaction.type)}`}>
                        {getTypeLabel(transaction.type)}
                      </span>
                    </td>
                    <td data-label="Quantity">{transaction.quantity}</td>
                    <td data-label="Date">
                      {date.toLocaleDateString()} {date.toLocaleTimeString()}
                    </td>
                  </motion.tr>
                );
              })
            )}
          </tbody>
        </table>
      </motion.div>

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
