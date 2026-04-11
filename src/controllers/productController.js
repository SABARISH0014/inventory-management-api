const productService = require("../services/productService");
exports.createProduct = async (req, res) => {
    try {
        const product = await productService.createProduct(req.body);
        res.status(201).json(product);
    } catch(error) {
        res.status(400).json({message: error.message});
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json(products);
    }  catch (error) {
        res.status(500).json({ message: error.message});
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const updated = await productService.updateProduct(
            req.params.id,
            req.body
        );
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        await productService.deleteProduct(req.params.id);
        res.status(200).json({ message: "Product deleted successfully"});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
