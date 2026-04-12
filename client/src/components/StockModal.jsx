import { useEffect, useState } from "react";

export default function StockModal({ open, onClose, product, type, onSubmit }) {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (open) {
      setQuantity(1);
    }
  }, [open, type]);

  if (!open || !product) return null;

  const label = type === "in" ? "Stock In" : "Stock Out";

  const handleSubmit = (event) => {
    event.preventDefault();
    const value = Number(quantity);
    if (value > 0) {
      onSubmit(value);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-panel" onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <h3>{label}</h3>
          <button type="button" className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <p className="modal-description">{product.name} (SKU: {product.sku})</p>
        <form className="modal-form" onSubmit={handleSubmit}>
          <label>
            Quantity
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
            />
          </label>
          <div className="modal-actions">
            <button type="button" className="button button-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="button button-primary">
              Confirm {label}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
