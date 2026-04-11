const Product = require("../models/Product");

exports.createProduct = async (data) => {
    const existing = await Product.findOne({sku: data.sku});
    if (existing) {
        throw new Error("SKU already exists");
    }
    const product = new Product(data);
    return await product.save();
};

exports.getAllProducts = async () => {
    return await Product.find().populate("supplierId");
};

exports.getProductById = async (id) => {
    const product = await Product.findById(id).populate("supplierId");
    if (!product) {
        throw new Error("Product not found");
    }
    return product;
};

exports.updateProduct = async (id, data) => {
    const product = await Product.findById(id);
    if (!product){
        throw new Error("Product not found");
    }
    return await Product.findByIdAndUpdate(id, data, {
        new: true
    });
};

exports.deleteProduct = async (id) => {
    const product = await Product.findById(id);
    if (!product){
        throw new Error("Product not found");
    }
    await Product.findByIdAndDelete(id);
};