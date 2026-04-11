const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");

/**
 * @swagger
 * /api/reports/summary:
 *   get:
 *     summary: Inventory summary
 *     tags: [Reports]
 */
router.get("/summary", reportController.getInventorySummary);

/**
 * @swagger
 * /api/reports/low-stock:
 *   get:
 *     summary: Low stock report
 *     tags: [Reports]
 */
router.get("/low-stock", reportController.getLowStockProducts);

/**
 * @swagger
 * /api/reports/total-value:
 *   get:
 *     summary: Total inventory value
 *     tags: [Reports]
 */
router.get("/total-value", reportController.getTotalInventoryValue);

/**
 * @swagger
 * /api/reports/transactions:
 *   get:
 *     summary: Transaction history
 *     tags: [Reports]
 */
router.get("/transactions", reportController.getTransactionHistory);
module.exports = router;