const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");

router.get("/summary", reportController.getInventorySummary);
router.get("/low-stock", reportController.getLowStockProducts);
router.get("/total-value", reportController.getTotalInventoryValue);
router.get("/transactions", reportController.getTransactionHistory);
module.exports = router;