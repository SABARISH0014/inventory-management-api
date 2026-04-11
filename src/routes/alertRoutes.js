const express = require("express");
const router = express.Router();
const alertController = require("../controllers/alertController");
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * @swagger
 * /api/alerts/low-stock:
 *   get:
 *     summary: Get low stock products
 *     tags: [Alerts]
 *     responses:
 *       200:
 *         description: Low stock products fetched
 */
router.get(
  "/low-stock",
  authMiddleware,
  alertController.getLowStockAlerts
);

module.exports = router;