const Product = require('../models/Product');
const Transaction = require('../models/Transaction');

exports.stockIn = async (req, res) => {
    try {
        const {productID, quantity} = req.body;
        if(!productID || !quantity){ return res.status(400).json({message : "Empty Fields"})}

        const product = await Product.findById(productID);
        if(!product)
            return res.status(400).json({message : "Product not found"});

        product.quantity += quantity;
        await product.save();

        await Transaction.create({
                productID,
                quantity,
                type: 'IN'
            });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.stockOut = async(req, res) => {
    try {
        const {productID, quantity} = req.body;
        if(!productID || !quantity)
            return res.status(400).json({message : "Empty Fields"})

        const product = await Product.findById(productID);
        if(!product)
            return res.status(400).json({message: "Product not found"})

        if(quantity > product.quantity)
            return res.status(400).json({message: "Insufficient stock"})

        product.quantity -= quantity;
        await product.save();

        await Transaction.create({
            productID,
            quantity,
            type: 'OUT'
        });

        if(product.quantity < product.minStock)
            return res.status(200).json({product, warning: "Stocks are low"});

        res.status(200).json({product});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
