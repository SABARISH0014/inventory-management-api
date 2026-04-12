import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { ArrowLeft } from "lucide-react";

export default function SupplierDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSupplierData = async () => {
      try {
        const supplierRes = await api.get(`/suppliers/${id}`);
        setSupplier(supplierRes.data);

        const productsRes = await api.get("/products");
        const supplierProducts = productsRes.data.filter(
          (p) => p.supplierId?._id === id || p.supplierId === id
        );
        setProducts(supplierProducts);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSupplierData();
  }, [id]);

  if (loading) {
    return (
      <section className="detail-page">
        <p>Loading supplier details...</p>
      </section>
    );
  }

  if (!supplier) {
    return (
      <section className="detail-page">
        <p>Supplier not found.</p>
      </section>
    );
  }

  return (
    <section className="detail-page">
      <button
        type="button"
        className="back-button"
        onClick={() => navigate("/suppliers")}
      >
        <ArrowLeft size={16} /> Back to Suppliers
      </button>

      <div className="detail-header">
        <div>
          <h1>{supplier.name}</h1>
          <p className="detail-subtitle">{supplier.email}</p>
        </div>
      </div>

      <div className="detail-grid">
        <div className="detail-card">
          <p className="card-label">Email</p>
          <p className="card-value">{supplier.email}</p>
        </div>
        <div className="detail-card">
          <p className="card-label">Phone</p>
          <p className="card-value">{supplier.phone || "—"}</p>
        </div>

      </div>

      {supplier.address ? (
        <div className="detail-section">
          <h2>Address</h2>
          <div className="detail-card">
            <p className="card-value">{supplier.address}</p>
          </div>
        </div>
      ) : null}

      <div className="detail-section">
        <h2>Associated Products ({products.length})</h2>
        <div className="table-wrapper">
          <table className="inventory-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>SKU</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="4" className="table-empty">
                    No products from this supplier.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr
                    key={product._id}
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/products/${product._id}`)}
                  >
                    <td>{product.name}</td>
                    <td>{product.sku}</td>
                    <td>₹ {product.price.toLocaleString()}</td>
                    <td>{product.quantity}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
