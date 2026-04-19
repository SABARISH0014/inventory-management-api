const express = require("express");
const router = express.Router();
const alertController = require("../controllers/alertController");
const authMiddleware = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/authorizeMiddleware");

/**
 * @swagger
 * /api/alerts/low-stock:
 *   get:
 *     summary: Get low stock products (Admin/Manager only)
 *     tags: [Alerts]
 *     responses:
 *       200:
 *         description: Low stock products fetched
 *       403:
 *         description: Access denied
 */
router.get(
  "/low-stock",
  authMiddleware,
  authorize("admin", "manager"),
  alertController.getLowStockAlerts
);

module.exports = router;
