import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api/axios";
import { Users, Plus, Edit2, Trash2, Shield } from "lucide-react";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "staff",
  });
  const [roleFilter, setRoleFilter] = useState("all");

  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get("/users");
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error loading users:", error);
      setStatusMessage("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await api.post("/users", formData);
      setStatusMessage("User created successfully");
      setFormData({ name: "", email: "", password: "", role: "staff" });
      setShowCreateForm(false);
      loadUsers();
    } catch (error) {
      setStatusMessage(error.response?.data?.message || "Failed to create user");
    }
  };

  const handleChangeRole = async (userId, newRole) => {
    try {
      await api.put(`/users/${userId}/role`, { role: newRole });
      setStatusMessage("User role updated successfully");
      loadUsers();
    } catch (error) {
      setStatusMessage(error.response?.data?.message || "Failed to update role");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await api.delete(`/users/${userId}`);
        setStatusMessage("User deleted successfully");
        loadUsers();
      } catch (error) {
        setStatusMessage(error.response?.data?.message || "Failed to delete user");
      }
    }
  };

  const filteredUsers = roleFilter === "all" ? users : users.filter((u) => u.role === roleFilter);

  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "#d946ef";
      case "manager":
        return "#8b5cf6";
      case "staff":
        return "#3b82f6";
      default:
        return "#6b7280";
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
    <section className="inventory-page" style={{ width: "100%", maxWidth: "100%" }}>
      <motion.div
        className="inventory-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <h2>
            <Users size={24} style={{ marginRight: "8px", verticalAlign: "middle" }} />
            User Management
          </h2>
          <p>Manage users and assign roles.</p>
        </div>
        <motion.button
          type="button"
          className="button button-primary"
          onClick={() => setShowCreateForm(!showCreateForm)}
          whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(79, 70, 229, 0.3)" }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={16} style={{ marginRight: "8px" }} />
          Create User
        </motion.button>
      </motion.div>

      {statusMessage && (
        <motion.p
          className="status-message success"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
        >
          {statusMessage}
        </motion.p>
      )}

      {showCreateForm && (
        <motion.div
          className="dashboard-note"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{ marginBottom: "24px" }}
        >
          <form onSubmit={handleCreateUser} style={{ display: "grid", gap: "16px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: "600", color: "#6b7280", textTransform: "uppercase" }}>
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    marginTop: "6px",
                    border: "1px solid rgba(79, 70, 229, 0.2)",
                    borderRadius: "8px",
                    background: "#ffffff",
                    color: "#0f172a",
                    fontSize: "14px",
                  }}
                />
              </div>
              <div>
                <label style={{ fontSize: "12px", fontWeight: "600", color: "#6b7280", textTransform: "uppercase" }}>
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    marginTop: "6px",
                    border: "1px solid rgba(79, 70, 229, 0.2)",
                    borderRadius: "8px",
                    background: "#ffffff",
                    color: "#0f172a",
                    fontSize: "14px",
                  }}
                />
              </div>
              <div>
                <label style={{ fontSize: "12px", fontWeight: "600", color: "#6b7280", textTransform: "uppercase" }}>
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    marginTop: "6px",
                    border: "1px solid rgba(79, 70, 229, 0.2)",
                    borderRadius: "8px",
                    background: "#ffffff",
                    color: "#0f172a",
                    fontSize: "14px",
                  }}
                />
              </div>
              <div>
                <label style={{ fontSize: "12px", fontWeight: "600", color: "#6b7280", textTransform: "uppercase" }}>
                  Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    marginTop: "6px",
                    border: "1px solid rgba(79, 70, 229, 0.2)",
                    borderRadius: "8px",
                    background: "#ffffff",
                    color: "#0f172a",
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  <option value="staff">Staff</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <motion.button
                type="submit"
                className="button button-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Create User
              </motion.button>
              <motion.button
                type="button"
                className="button button-secondary"
                onClick={() => setShowCreateForm(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cancel
              </motion.button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Role Filter */}
      <div style={{ marginBottom: "24px", display: "flex", gap: "12px" }}>
        {["all", "admin", "manager", "staff"].map((role) => (
          <motion.button
            key={role}
            type="button"
            className={`button ${roleFilter === role ? "button-primary" : "button-secondary"}`}
            onClick={() => setRoleFilter(role)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {role === "all" ? "All Users" : role.charAt(0).toUpperCase() + role.slice(1)}
          </motion.button>
        ))}
      </div>

      <motion.div
        className="table-wrapper"
        variants={tableVariants}
        initial="hidden"
        animate="visible"
      >
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="table-loading">
                  <motion.div
                    className="loading-spinner"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Loading users...
                </td>
              </tr>
            ) : filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="5" className="table-empty">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Users size={40} style={{ marginBottom: "12px", opacity: 0.3 }} />
                    <p>No users found.</p>
                  </motion.div>
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <motion.tr key={user._id} variants={rowVariants}>
                  <td data-label="Name">{user.name}</td>
                  <td data-label="Email">{user.email}</td>
                  <td data-label="Role">
                    <select
                      value={user.role}
                      onChange={(e) => handleChangeRole(user._id, e.target.value)}
                      style={{
                        padding: "6px 10px",
                        border: "1px solid rgba(79, 70, 229, 0.2)",
                        borderRadius: "6px",
                        background: "#ffffff",
                        color: getRoleColor(user.role),
                        fontSize: "13px",
                        fontWeight: "600",
                        cursor: "pointer",
                      }}
                    >
                      <option value="staff">Staff</option>
                      <option value="manager">Manager</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td data-label="Created">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="action-cell" data-label="Actions">
                    <motion.button
                      type="button"
                      className="button button-icon button-danger"
                      title="Delete"
                      onClick={() => handleDeleteUser(user._id)}
                      whileHover={{ scale: 1.1, backgroundColor: "rgba(239, 68, 68, 0.1)" }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Trash2 size={16} />
                    </motion.button>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </motion.div>
    </section>
  );
}
