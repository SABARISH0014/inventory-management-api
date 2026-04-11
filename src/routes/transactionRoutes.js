const express = require('express');
const transactionController = require('../controllers/transactionController');

const router = express.Router();

/**
 * @swagger
 * /api/transactions/{productId}:
 *   get:
 *     summary: Get transactions by product
 *     tags: [Transactions]
 */
router.get("/:productId", transactionController.getTransactionsByProduct);

/**
 * @swagger
 * /api/transactions:
 *   post:
 *     summary: Create transaction
 *     tags: [Transactions]
 */
router.post("/", transactionController.createTransaction);

/**
 * @swagger
 * /api/transactions/alerts/low-stock:
 *   get:
 *     summary: Get low stock alerts
 *     tags: [Transactions]
 */
router.get("/alerts/low-stock", transactionController.getLowStockAlert);

module.exports = router;