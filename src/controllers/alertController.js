// src/controllers/alertController.js

const alertService = require("../services/alertService");

exports.getLowStockAlerts = async (req, res) => {
  try {

    const alerts = await alertService.getLowStockAlerts();

    res.status(200).json({
      success: true,
      data: alerts
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};