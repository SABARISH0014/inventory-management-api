const STATUS_CODES = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
};

const MESSAGES = {
  SUPPLIER_CREATED: "Supplier created successfully",
  SUPPLIER_UPDATED: "Supplier updated successfully",
  SUPPLIER_DELETED: "Supplier deleted successfully",
  SUPPLIER_NOT_FOUND: "Supplier not found",
  PRODUCT_CREATED: "Product created successfully",
  PRODUCT_UPDATED: "Product updated successfully",
  PRODUCT_DELETED: "Product deleted successfully",
  PRODUCT_NOT_FOUND: "Product not found",
  TRANSACTION_CREATED: "Transaction recorded successfully",
  TRANSACTION_FAILED: "Transaction failed",
  STOCK_UPDATED: "Stock updated successfully",
  STOCK_NOT_AVAILABLE: "Insufficient stock",
  INVALID_DATA: "Invalid input data",
  SERVER_ERROR: "Internal server error"
};

module.exports = {
  STATUS_CODES,
  MESSAGES
};