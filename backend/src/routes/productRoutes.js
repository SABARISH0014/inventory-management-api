const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/authorizeMiddleware");
const { validateProduct, validateProductUpdate } = require("../utils/validators");

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product (Admin/Manager only)
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               sku:
 *                 type: string
 *               price:
 *                 type: number
 *               quantity:
 *                 type: number
 *               minStock:
 *                 type: number
 *               supplierId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product created
 *       400:
 *         description: Invalid input
 *       403:
 *         description: Access denied
 *       500:
 *         description: Server error
 */
router.post("/", authMiddleware, authorize("admin", "manager"), productController.createProduct);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products (All roles)
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 */
router.get("/", productController.getAllProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product by ID (All roles)
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product found
 *       404:
 *         description: Product not found
 */
router.get("/:id", productController.getProductById);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update product (Admin/Manager only)
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Product updated
 *       400:
 *         description: Invalid data
 *       403:
 *         description: Access denied
 */
router.put("/:id", authMiddleware, authorize("admin", "manager"), validateProductUpdate, productController.updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete product (Admin only)
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Product deleted
 *       403:
 *         description: Access denied
 *       404:
 *         description: Not found
 */
router.delete("/:id", authMiddleware, authorize("admin"), productController.deleteProduct);

module.exports = router;
