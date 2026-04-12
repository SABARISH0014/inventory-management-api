import { useEffect, useState } from "react";
import api from "../api/axios";

export default function DeleteConfirmModal({ open, onClose, title, onConfirm }) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-panel modal-small" onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <h3>Delete {title}</h3>
          <button type="button" className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <p className="modal-description">
          Are you sure you want to delete this {title.toLowerCase()}? This action cannot be undone.
        </p>
        <div className="modal-actions">
          <button type="button" className="button button-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="button button-danger"
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
