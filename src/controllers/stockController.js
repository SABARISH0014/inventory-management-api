const { useTransition } = require('react');
const Product = require('../models/Product');
const Transaction = require('../models/Transaction');

exports.StockIn = async (req, res) => {
    const {productID, quantity} = req.body;
    if(!productID || !quantity){ return res.status(400).json({message : "Empty Fields"})}

    const product = await Product.findById(productID);
    if(!product)
        return res.status(400).json({message : "Product not found"});

    product.quantity += quantity;
    await product.save();

    await Transaction.create({
            productId,
            quantity,
            type: 'IN'
        });
    res.status(200).json(product);
}

exports.stockOut = async(req, res) => {
    const {productID, quantity} = req.body;
    if(!productID || !quantity)
        return res.status(400).json({message : "Empty Fields"})

    const product = await Product.findById(productID);
    if(!product)
        return res.status(400).json({message: "Product not found"})

    if(quantity > product.quantity)
        return res.status(400).json({message: "Insufficient stock"})

    else
    {
           product.quantity-= quantity;
           await product.save();
    }
    
    if(product.quantity < minStock)
        return res.status(200).json({message: "Stocks are low"})
    
    await Transaction.create({
        productId,
        quantity,
        type: 'OUT'
    })
    res.status(200).json({product});
}
