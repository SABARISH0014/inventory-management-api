const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/authorizeMiddleware");

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users
 *       403:
 *         description: Access denied
 */
router.get("/", authMiddleware, authorize("admin"), userController.getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID (Admin only)
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User found
 *       403:
 *         description: Access denied
 *       404:
 *         description: User not found
 */
router.get("/:id", authMiddleware, authorize("admin"), userController.getUserById);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create new user (Admin only)
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [admin, manager, staff]
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Invalid input
 *       403:
 *         description: Access denied
 */
router.post("/", authMiddleware, authorize("admin"), userController.createUser);

/**
 * @swagger
 * /api/users/{id}/role:
 *   put:
 *     summary: Update user role (Admin only)
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [admin, manager, staff]
 *     responses:
 *       200:
 *         description: User role updated
 *       403:
 *         description: Access denied
 *       404:
 *         description: User not found
 */
router.put("/:id/role", authMiddleware, authorize("admin"), userController.updateUserRole);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user (Admin only)
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User deleted
 *       403:
 *         description: Access denied
 *       404:
 *         description: User not found
 */
router.delete("/:id", authMiddleware, authorize("admin"), userController.deleteUser);

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Get current user info (All roles)
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Current user info
 */
router.get("/me", authMiddleware, userController.getCurrentUser);

module.exports = router;
