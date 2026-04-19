const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/authorizeMiddleware');
const { stockIn, stockOut } = require('../controllers/stockController');

/**
 * @swagger
 * /api/stock/in:
 *   post:
 *     summary: Add stock to a product (Admin/Manager/Staff)
 *     tags: [Stock]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productID:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Stock added successfully
 *       403:
 *         description: Access denied
 */
router.post('/in', authMiddleware, authorize('admin', 'manager', 'staff'), stockIn);

/**
 * @swagger
 * /api/stock/out:
 *   post:
 *     summary: Remove stock from a product (Admin/Manager only)
 *     tags: [Stock]
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Stock removed successfully
 *       403:
 *         description: Access denied
 */
router.post('/out', authMiddleware, authorize('admin', 'manager'), stockOut);

module.exports = router;
