const express = require("express");
const router = express.Router();
const supplierController = require("../controllers/supplierController");
const authMiddleware = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/authorizeMiddleware");

/**
 * @swagger
 * /api/suppliers:
 *   post:
 *     summary: Create supplier (Admin/Manager only)
 *     tags: [Suppliers]
 *     responses:
 *       201:
 *         description: Supplier created
 *       403:
 *         description: Access denied
 */
router.post("/", authMiddleware, authorize("admin", "manager"), supplierController.createSupplier);

/**
 * @swagger
 * /api/suppliers:
 *   get:
 *     summary: Get all suppliers (All roles)
 *     tags: [Suppliers]
 */
router.get("/", supplierController.getSuppliers);

/**
 * @swagger
 * /api/suppliers/{id}:
 *   get:
 *     summary: Get supplier by ID (All roles)
 *     tags: [Suppliers]
 */
router.get("/:id", supplierController.getSupplierById);

/**
 * @swagger
 * /api/suppliers/{id}:
 *   put:
 *     summary: Update supplier (Admin/Manager only)
 *     tags: [Suppliers]
 *     responses:
 *       200:
 *         description: Supplier updated
 *       403:
 *         description: Access denied
 */
router.put("/:id", authMiddleware, authorize("admin", "manager"), supplierController.updateSupplier);

/**
 * @swagger
 * /api/suppliers/{id}:
 *   delete:
 *     summary: Delete supplier (Admin only)
 *     tags: [Suppliers]
 *     responses:
 *       200:
 *         description: Supplier deleted
 *       403:
 *         description: Access denied
 */
router.delete("/:id", authMiddleware, authorize("admin"), supplierController.deleteSupplier);

module.exports = router;
