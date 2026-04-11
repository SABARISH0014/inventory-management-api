const express = require('express');
const router = express.Router();

const { stockIn, stockOut } = require('../controllers/stockController');

/**
 * @swagger
 * /api/stock/in:
 *   post:
 *     summary: Add stock to a product
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
 */

router.post('/in', stockIn);

/**
 * @swagger
 * /api/stock/out:
 *   post:
 *     summary: Remove stock from a product
 *     tags: [Stock]
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Stock removed successfully
 */

router.post('/out', stockOut);

module.exports = router;