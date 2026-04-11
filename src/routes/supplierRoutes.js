const express = require("express");
const router = express.Router();
const supplierController = require("../controllers/supplierController");

/**
 * @swagger
 * /api/suppliers:
 *   post:
 *     summary: Create supplier
 *     tags: [Suppliers]
 *     responses:
 *       201:
 *         description: Supplier created
 */
router.post("/",supplierController.createSupplier);

/**
 * @swagger
 * /api/suppliers:
 *   get:
 *     summary: Get all suppliers
 *     tags: [Suppliers]
 */
router.get("/",supplierController.getSuppliers);

/**
 * @swagger
 * /api/suppliers/{id}:
 *   get:
 *     summary: Get supplier by ID
 *     tags: [Suppliers]
 */
router.get("/:id",supplierController.getSupplierById);

/**
 * @swagger
 * /api/suppliers/{id}:
 *   put:
 *     summary: Update supplier
 *     tags: [Suppliers]
 */
router.put("/:id",supplierController.updateSupplier);

/**
 * @swagger
 * /api/suppliers/{id}:
 *   delete:
 *     summary: Delete supplier
 *     tags: [Suppliers]
 */
router.delete("/:id",supplierController.deleteSupplier);

module.exports=router;
