import Transaction from '..models/Transaction.js';
import { getLowStockProducts } from '../services/alertService.js';


//get transaction by productId

export const getTransactionsByProduct = async (req, res) => {

    try{
        const { productId } = req.params;

        const transactions = await Transaction.find({ productId });

        res.status(200).json(transactions);
        
    }catch(error){
        res.status(500).json({ message: error.message});
    }
};

//create transaction using await

export const createTransaction = async (req, res) => {

    try{
        await Transaction.create({
            productId,
            type,
            quantity,
        });
    }catch(error){
        console.error("Transaction Error:", error.message);
    }
};

//get lowStock Alert

export const getLowStockAlert = async (req, res) => {

    try{
        const lowStockProducts = await getLowStockProducts();

        res.status(200).json(lowStockProducts);

    }catch(error){

        res.status(500).json({ message: error.message });
    }
};

export {
    getTransactionsByProduct,
    createTransaction,
    getLowStockAlert
};