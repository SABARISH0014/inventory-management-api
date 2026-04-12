const reportService = require("../services/reportService");

exports.getInventorySummary = async (req, res) => {
  try {
    const data = await reportService.getInventorySummary();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getLowStockProducts = async (req, res) => {
  try {
    const data = await reportService.getLowStockProducts();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTotalInventoryValue = async (req, res) => {
  try {
    const data = await reportService.getTotalInventoryValue();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTransactionHistory = async (req, res) => {
  try {
    const data = await reportService.getTransactionHistory();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};