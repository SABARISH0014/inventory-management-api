const Product = require("../models/Product");
const Transaction = require("../models/Transaction");

exports.getInventorySummary = async () => {
  const products = await Product.find();

  const totalProducts = products.length;
  
  const totalQuantity = products.reduce(
    (sum, p) => sum + p.quantity,
    0
  );

  const totalValue = products.reduce(
    (sum, p) => sum + (p.price * p.quantity),
    0
  );

  const lowStockCount = products.filter(p => p.quantity < p.minStock).length;

  return {
    totalProducts,
    totalQuantity,
    totalValue,
    lowStockCount
  };
};

exports.getLowStockProducts = async () => {
  return await Product.find({
    $expr: { $lt: ["$quantity", "$minStock"] }
  });
};

exports.getTotalInventoryValue = async () => {
  const products = await Product.find();

  const totalValue = products.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );

  return { totalValue };
};

exports.getTransactionHistory = async () => {
  return await Transaction.find().populate("productID");
};