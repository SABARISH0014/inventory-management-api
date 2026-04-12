const Transaction = require('../models/Transaction');
const alertService = require('../services/alertService');


//get transaction by productId

exports.getTransactionsByProduct = async (req, res) => {

    try{
        const { productId } = req.params;

        const transactions = await Transaction.find({ productID: productId });

        res.status(200).json(transactions);
        
    }catch(error){
        res.status(500).json({ message: error.message});
    }
};
