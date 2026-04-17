import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";
import api from "../api/axios";
import TransactionModal from "../components/TransactionModal";
import { TrendingUp, Package, AlertTriangle, DollarSign, Activity, Zap } from "lucide-react";

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [lowStockCount, setLowStockCount] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [trendData, setTrendData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [transactionModalOpen, setTransactionModalOpen] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [summaryRes, trendsRes] = await Promise.all([
          api.get("/reports/summary"),
          api.get("/reports/trends")
        ]);

        setSummary(summaryRes.data);
        setLowStockCount(summaryRes.data.lowStockCount);
        setTotalValue(summaryRes.data.totalValue);
        setTrendData(trendsRes.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 140,
        damping: 18,
      },
    },
  };

  const chartVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.3,
      },
    },
  };

  // Prepare data for pie chart
  const pieData = [
    { name: 'In Stock', value: summary?.totalQuantity - lowStockCount || 0, color: '#10b981' },
    { name: 'Low Stock', value: lowStockCount, color: '#f59e0b' },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} className="tooltip-value" style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <section className="dashboard-page">
      <motion.div
        className="dashboard-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <h2>
            <Activity size={24} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            Dashboard Overview
          </h2>
          <p>Monitor your inventory performance and trends</p>
        </div>
        <motion.button
          type="button"
          className="button button-primary"
          onClick={() => setTransactionModalOpen(true)}
          whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(79, 70, 229, 0.3)" }}
          whileTap={{ scale: 0.95 }}
        >
          <Zap size={16} style={{ marginRight: '8px' }} />
          New Transaction
        </motion.button>
      </motion.div>

      <motion.div
        className="dashboard-grid"
        variants={gridVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.article className="metric-card metric-products" variants={cardVariants}>
          <div className="metric-icon">
            <Package size={24} />
          </div>
          <p className="metric-label">Total Products</p>
          <p className="metric-value">{loading ? "—" : summary?.totalProducts ?? 0}</p>
          <div className="metric-sparkline">
            <TrendingUp size={14} />
            <span>+12%</span>
          </div>
        </motion.article>

        <motion.article className="metric-card metric-quantity" variants={cardVariants}>
          <div className="metric-icon">
            <Activity size={24} />
          </div>
          <p className="metric-label">Total Quantity</p>
          <p className="metric-value">{loading ? "—" : summary?.totalQuantity ?? 0}</p>
          <div className="metric-sparkline">
            <TrendingUp size={14} />
            <span>+8%</span>
          </div>
        </motion.article>

        <motion.article className="metric-card metric-value" variants={cardVariants}>
          <div className="metric-icon">
            <DollarSign size={24} />
          </div>
          <p className="metric-label">Total Value</p>
          <p className="metric-value">{loading ? "—" : `₹ ${totalValue.toLocaleString()}`}</p>
          <div className="metric-sparkline">
            <TrendingUp size={14} />
            <span>+15%</span>
          </div>
        </motion.article>

        <motion.article className="metric-card metric-alert" variants={cardVariants}>
          <div className="metric-icon">
            <AlertTriangle size={24} />
          </div>
          <p className="metric-label">Low Stock Items</p>
          <p className="metric-value">{loading ? "—" : lowStockCount}</p>
          <div className="metric-sparkline alert">
            <AlertTriangle size={14} />
            <span>Needs attention</span>
          </div>
        </motion.article>
      </motion.div>

      <motion.div
        className="dashboard-note"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <p>📊 Review inventory health and stock readiness at a glance. Stay ahead with real-time insights!</p>
      </motion.div>

      <div className="charts-grid">
        <motion.section
          className="dashboard-chart-card"
          variants={chartVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="dashboard-chart-header">
            <h3>
              <TrendingUp size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
              30-Day Inventory Trends
            </h3>
          </div>
          {trendData.length === 0 ? (
            <p className="chart-empty">📈 No inventory trend data available for the last 30 days.</p>
          ) : (
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={trendData} margin={{ top: 16, right: 16, left: 0, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  axisLine={{ stroke: '#d1d5db' }}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  axisLine={{ stroke: '#d1d5db' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="top"
                  height={36}
                  iconType="line"
                  wrapperStyle={{ fontSize: '14px', color: '#374151' }}
                />
                <Line
                  type="monotone"
                  dataKey="totalIn"
                  stroke="#10b981"
                  strokeWidth={4}
                  name="Stock In"
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: '#10b981', strokeWidth: 2, fill: '#fff' }}
                />
                <Line
                  type="monotone"
                  dataKey="totalOut"
                  stroke="#ef4444"
                  strokeWidth={4}
                  name="Stock Out"
                  dot={{ fill: '#ef4444', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: '#ef4444', strokeWidth: 2, fill: '#fff' }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </motion.section>

        <motion.section
          className="dashboard-chart-card"
          variants={chartVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="dashboard-chart-header">
            <h3>
              <Package size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
              Stock Distribution
            </h3>
          </div>
          {loading ? (
            <div className="chart-loading">
              <div className="loading-spinner"></div>
              <p>Loading chart data...</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  wrapperStyle={{ fontSize: '14px', color: '#374151' }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </motion.section>
      </div>

      <TransactionModal
        open={transactionModalOpen}
        onClose={() => setTransactionModalOpen(false)}
        onSuccess={() => {}}
      />
    </section>
  );
}
