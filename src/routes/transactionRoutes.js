import express from 'express';
import { getTransactionsByProduct, getLowStockAlert } from '..controllers/transactionController.js';

const router = express.Router();

router.get("/transactions/:productId", getTransactionsByProduct);
router.get("/alerts/low-stock", getLowStockAlert);

export default router;