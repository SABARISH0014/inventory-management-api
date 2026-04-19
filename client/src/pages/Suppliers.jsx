import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios";
import SupplierModal from "../components/SupplierModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import { Edit2, Trash2, Plus, Users, Building, Phone, Mail } from "lucide-react";

export default function Suppliers() {
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserRole(user?.role || "staff");
  }, []);

  const loadSuppliers = async () => {
    setLoading(true);
    try {
      const response = await api.get("/suppliers");
      setSuppliers(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSuppliers();
  }, []);

  const openModal = (supplier = null) => {
    setSelectedSupplier(supplier);
    setModalOpen(true);
    setStatusMessage("");
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedSupplier(null);
  };

  const handleSaveSupplier = async (formData) => {
    if (selectedSupplier) {
      await api.put(`/suppliers/${selectedSupplier._id}`, formData);
    } else {
      await api.post("/suppliers", formData);
    }
    setStatusMessage(
      selectedSupplier ? "Supplier updated successfully." : "Supplier created successfully."
    );
    loadSuppliers();
    setTimeout(() => setStatusMessage(""), 3000);
  };

  const openDeleteModal = (supplier) => {
    setSelectedSupplier(supplier);
    setDeleteModalOpen(true);
  };

  const handleDeleteSupplier = async () => {
    if (selectedSupplier) {
      await api.delete(`/suppliers/${selectedSupplier._id}`);
      setStatusMessage("Supplier deleted successfully.");
      setSelectedSupplier(null);
      loadSuppliers();
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

  return (
    <section className="suppliers-page" style={{ width: '100%', maxWidth: '100%' }}>
      <motion.div
        className="inventory-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <h2>
            <Users size={24} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            Supplier Management
          </h2>
          <p>Manage your supplier relationships and contact information</p>
        </div>
        {userRole && ["admin", "manager"].includes(userRole) && (
          <motion.button
            type="button"
            className="button button-primary"
            onClick={() => openModal()}
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(79, 70, 229, 0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={16} style={{ marginRight: '8px' }} />
            Add Supplier
          </motion.button>
        )}
      </motion.div>

      <motion.div
        className="suppliers-stats"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="stat-card">
          <Building size={20} />
          <div>
            <p className="stat-value">{suppliers.length}</p>
            <p className="stat-label">Total Suppliers</p>
          </div>
        </div>
        <div className="stat-card success">
          <Users size={20} />
          <div>
            <p className="stat-value">{suppliers.filter(s => s.email).length}</p>
            <p className="stat-label">Active Contacts</p>
          </div>
        </div>
      </motion.div>

      {statusMessage && (
        <motion.div
          className="status-message success"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
        >
          {statusMessage}
        </motion.div>
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
              <th>Supplier</th>
              <th>Contact</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="table-loading">
                  <div className="loading-spinner"></div>
                  Loading suppliers...
                </td>
              </tr>
            ) : suppliers.length === 0 ? (
              <tr>
                <td colSpan="4" className="table-empty">
                  No suppliers available.
                </td>
              </tr>
            ) : (
              suppliers.map((supplier) => (
                <motion.tr
                  key={supplier._id}
                  variants={rowVariants}
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/suppliers/${supplier._id}`)}
                  whileHover={{ backgroundColor: "rgba(79, 70, 229, 0.04)" }}
                >
                  <td data-label="Supplier">
                    <div className="supplier-info">
                      <strong>{supplier.name}</strong>
                      <div className="supplier-meta">
                        <span className="supplier-badge">🏢 Supplier</span>
                      </div>
                    </div>
                  </td>
                  <td data-label="Contact">
                    <div className="contact-info">
                      <div className="contact-item">
                        <Mail size={14} />
                        <span>{supplier.email}</span>
                      </div>
                      {supplier.phone && (
                        <div className="contact-item">
                          <Phone size={14} />
                          <span>{supplier.phone}</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td data-label="Address">
                    <span className="address-text">{supplier.address || "—"}</span>
                  </td>
                  <td className="action-cell" data-label="Actions" onClick={(e) => e.stopPropagation()}>
                    <motion.button
                      type="button"
                      className="button button-icon"
                      title="Edit"
                      onClick={() => openModal(supplier)}
                      whileHover={{ scale: 1.1, backgroundColor: "rgba(79, 70, 229, 0.1)" }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Edit2 size={16} />
                    </motion.button>
                    {userRole === "admin" && (
                      <motion.button
                        type="button"
                        className="button button-icon button-danger"
                        title="Delete"
                        onClick={() => openDeleteModal(supplier)}
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

      <SupplierModal
        open={modalOpen}
        onClose={closeModal}
        supplier={selectedSupplier}
        onSubmit={handleSaveSupplier}
      />

      <DeleteConfirmModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Supplier"
        onConfirm={handleDeleteSupplier}
      />
    </section>
  );
}
