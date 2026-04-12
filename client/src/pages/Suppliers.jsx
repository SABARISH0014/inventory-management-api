import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import SupplierModal from "../components/SupplierModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import { Edit2, Trash2 } from "lucide-react";

export default function Suppliers() {
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(true);

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
    }
  };

  return (
    <section className="suppliers-page">
      <div className="inventory-header">
        <div>
          <h2>Suppliers</h2>
          <p>Manage supplier information and contacts.</p>
        </div>
        <button type="button" className="button button-primary" onClick={() => openModal()}>
          Add Supplier
        </button>
      </div>

      {statusMessage ? <p className="status-message">{statusMessage}</p> : null}

      <div className="table-wrapper">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="table-loading">
                  Loading suppliers...
                </td>
              </tr>
            ) : suppliers.length === 0 ? (
              <tr>
                <td colSpan="6" className="table-empty">
                  No suppliers available.
                </td>
              </tr>
            ) : (
              suppliers.map((supplier) => (
                <tr
                  key={supplier._id}
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/suppliers/${supplier._id}`)}
                >
                  <td>{supplier.name}</td>
                  <td>{supplier.email}</td>
                  <td>{supplier.phone}</td>
                  <td>{supplier.address}</td>
                  <td className="action-cell" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      className="button button-icon"
                      title="Edit"
                      onClick={() => openModal(supplier)}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      type="button"
                      className="button button-icon button-danger"
                      title="Delete"
                      onClick={() => openDeleteModal(supplier)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

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
