import product from '../models/Product.js';

export const checkLowStock = async () => {

    const products = await product.find();

    const lowStock = products.filter(
        (product) => product.quantity < product.minStock
    );

    return lowStock;
}