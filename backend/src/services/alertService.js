const Product = require('../models/Product');

exports.getLowStockAlerts = async () => {

    const products = await Product.find();

    const lowStock = products.filter(
        (product) => product.quantity < product.minStock
    );

    return lowStock;
}