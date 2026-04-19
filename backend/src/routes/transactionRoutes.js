const express = require('express');
const transactionController = require('../controllers/transactionController');
const authMiddleware = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/authorizeMiddleware');

const router = express.Router();

/**
 * @swagger
 * /api/transactions/{productId}:
 *   get:
 *     summary: Get transactions by product (All roles)
 *     tags: [Transactions]
 */
router.get("/:productId", transactionController.getTransactionsByProduct);

module.exports = router;
