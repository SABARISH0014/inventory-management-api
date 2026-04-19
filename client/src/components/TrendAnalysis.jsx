import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import api from "../api/axios";
import { TrendingUp, Download, Filter } from "lucide-react";

export default function TrendAnalysis() {
  const [trendData, setTrendData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartType, setChartType] = useState("line");
  const [dateRange, setDateRange] = useState("30");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [useCustomRange, setUseCustomRange] = useState(false);

  useEffect(() => {
    fetchTrendData();
  }, []);

  const fetchTrendData = async () => {
    setLoading(true);
    try {
      const response = await api.get("/reports/trends");
      setTrendData(response.data);
      filterDataByRange(response.data, "30");
    } catch (error) {
      console.error("Error fetching trend data:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterDataByRange = (data, range) => {
    if (!data || data.length === 0) {
      setFilteredData([]);
      return;
    }

    let filtered = [...data];

    if (range === "7") {
      filtered = filtered.slice(-7);
    } else if (range === "30") {
      filtered = filtered.slice(-30);
    } else if (range === "90") {
      filtered = filtered.slice(-90);
    } else if (range === "custom" && startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      filtered = filtered.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= start && itemDate <= end;
      });
    }

    setFilteredData(filtered);
  };

  const handleDateRangeChange = (range) => {
    setDateRange(range);
    if (range !== "custom") {
      setUseCustomRange(false);
      filterDataByRange(trendData, range);
    }
  };

  const handleCustomDateChange = () => {
    if (startDate && endDate) {
      setUseCustomRange(true);
      filterDataByRange(trendData, "custom");
    }
  };

  const exportToCSV = () => {
    if (filteredData.length === 0) return;

    const headers = ["Date", "Stock In", "Stock Out"];
    const rows = filteredData.map((item) => [
      `"${item.date}"`,
      item.totalIn,
      item.totalOut,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `inventory-trends-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} className="tooltip-value" style={{ color: entry.color }}>
              {`${entry.dataKey === "totalIn" ? "Stock In" : "Stock Out"}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
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
        delay: 0.2,
      },
    },
  };

  const renderChart = () => {
    if (filteredData.length === 0) {
      return (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "#6b7280" }}>
          <p>No data available for the selected date range.</p>
        </div>
      );
    }

    const commonProps = {
      data: filteredData,
      margin: { top: 16, right: 16, left: 0, bottom: 8 },
    };

    switch (chartType) {
      case "line":
        return (
          <ResponsiveContainer width="100%" height={360}>
            <LineChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={{ stroke: "#d1d5db" }} />
              <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={{ stroke: "#d1d5db" }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: "14px", color: "#374151" }} />
              <Line
                type="monotone"
                dataKey="totalIn"
                stroke="#10b981"
                strokeWidth={3}
                name="Stock In"
                dot={{ fill: "#10b981", r: 5 }}
                activeDot={{ r: 7 }}
              />
              <Line
                type="monotone"
                dataKey="totalOut"
                stroke="#ef4444"
                strokeWidth={3}
                name="Stock Out"
                dot={{ fill: "#ef4444", r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={360}>
            <BarChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={{ stroke: "#d1d5db" }} />
              <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={{ stroke: "#d1d5db" }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: "14px", color: "#374151" }} />
              <Bar dataKey="totalIn" fill="#10b981" name="Stock In" radius={[8, 8, 0, 0]} />
              <Bar dataKey="totalOut" fill="#ef4444" name="Stock Out" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      case "area":
        return (
          <ResponsiveContainer width="100%" height={360}>
            <AreaChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={{ stroke: "#d1d5db" }} />
              <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={{ stroke: "#d1d5db" }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: "14px", color: "#374151" }} />
              <Area
                type="monotone"
                dataKey="totalIn"
                fill="#10b981"
                stroke="#10b981"
                fillOpacity={0.3}
                name="Stock In"
              />
              <Area
                type="monotone"
                dataKey="totalOut"
                fill="#ef4444"
                stroke="#ef4444"
                fillOpacity={0.3}
                name="Stock Out"
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <motion.section
      className="dashboard-chart-card"
      variants={chartVariants}
      initial="hidden"
      animate="visible"
      style={{ marginBottom: "24px" }}
    >
      <div className="dashboard-chart-header">
        <h3>
          <TrendingUp size={20} style={{ marginRight: "8px", verticalAlign: "middle" }} />
          Inventory Trends Analysis
        </h3>
      </div>

      {/* Controls */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
          padding: "16px",
          background: "rgba(79, 70, 229, 0.04)",
          borderRadius: "12px",
        }}
      >
        {/* Chart Type Selector */}
        <div>
          <label style={{ fontSize: "12px", fontWeight: "600", color: "#6b7280", textTransform: "uppercase" }}>
            Chart Type
          </label>
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
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
            <option value="line">Line Chart</option>
            <option value="bar">Bar Chart</option>
            <option value="area">Area Chart</option>
          </select>
        </div>

        {/* Date Range Selector */}
        <div>
          <label style={{ fontSize: "12px", fontWeight: "600", color: "#6b7280", textTransform: "uppercase" }}>
            Date Range
          </label>
          <select
            value={useCustomRange ? "custom" : dateRange}
            onChange={(e) => handleDateRangeChange(e.target.value)}
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
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="90">Last 90 Days</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>

        {/* Custom Date Range */}
        {useCustomRange && (
          <>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "600", color: "#6b7280", textTransform: "uppercase" }}>
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
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
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
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
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <motion.button
                type="button"
                className="button button-primary"
                onClick={handleCustomDateChange}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ width: "100%" }}
              >
                <Filter size={14} style={{ marginRight: "6px" }} />
                Apply Filter
              </motion.button>
            </div>
          </>
        )}

        {/* Export Button */}
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <motion.button
            type="button"
            className="button button-secondary"
            onClick={exportToCSV}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ width: "100%" }}
          >
            <Download size={14} style={{ marginRight: "6px" }} />
            Export CSV
          </motion.button>
        </div>
      </div>

      {/* Chart */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <motion.div
            className="loading-spinner"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            style={{ margin: "0 auto 16px" }}
          />
          <p>Loading trend data...</p>
        </div>
      ) : (
        renderChart()
      )}
    </motion.section>
  );
}
