const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");
const authMiddleware = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/authorizeMiddleware");

/**
 * @swagger
 * /api/reports/summary:
 *   get:
 *     summary: Inventory summary (All roles)
 *     tags: [Reports]
 */
router.get("/summary", reportController.getInventorySummary);

/**
 * @swagger
 * /api/reports/low-stock:
 *   get:
 *     summary: Low stock report (Admin/Manager only)
 *     tags: [Reports]
 */
router.get("/low-stock", authMiddleware, authorize("admin", "manager"), reportController.getLowStockProducts);

/**
 * @swagger
 * /api/reports/total-value:
 *   get:
 *     summary: Total inventory value (Admin/Manager only)
 *     tags: [Reports]
 */
router.get("/total-value", authMiddleware, authorize("admin", "manager"), reportController.getTotalInventoryValue);

/**
 * @swagger
 * /api/reports/transactions:
 *   get:
 *     summary: Transaction history (Admin/Manager only)
 *     tags: [Reports]
 */
router.get("/transactions", authMiddleware, authorize("admin", "manager"), reportController.getTransactionHistory);

/**
 * @swagger
 * /api/reports/trends:
 *   get:
 *     summary: Inventory trends with optional date range (All roles)
 *     tags: [Reports]
 *     parameters:
 *       - in: query
 *         name: days
 *         schema:
 *           type: integer
 *         description: Number of days (default 30)
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *         description: Start date (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *         description: End date (YYYY-MM-DD)
 */
router.get("/trends", reportController.getInventoryTrends);

/**
 * @swagger
 * /api/reports/trends/monthly:
 *   get:
 *     summary: Monthly inventory trends (Admin/Manager only)
 *     tags: [Reports]
 */
router.get("/trends/monthly", authMiddleware, authorize("admin", "manager"), reportController.getMonthlyTrends);

/**
 * @swagger
 * /api/reports/trends/product/:productId:
 *   get:
 *     summary: Product-specific trends (All roles)
 *     tags: [Reports]
 */
router.get("/trends/product/:productId", reportController.getProductTrends);

module.exports = router;
