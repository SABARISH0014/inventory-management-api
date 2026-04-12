const {body, validationResult} = require("express-validator");

exports.validateProduct = (req, res) => {
    const errors = [];

    if (!req.body.name || req.body.name.trim() === "") {
        errors.push("Name is required");
    }
    if (!req.body.sku || req.body.sku.trim() === "") {
        errors.push("SKU is required");
    }
    if (!req.body.price || isNaN(req.body.price) || req.body.price < 0) {
        errors.push("Price must be a valid number >= 0");
    }
    if (!req.body.quantity || isNaN(req.body.quantity) || req.body.quantity < 0) {
        errors.push("Quantity must be a valid number >= 0");
    }
    if (!req.body.minStock || isNaN(req.body.minStock) || req.body.minStock < 0) {
        errors.push("Min Stock must be a valid number >= 0");
    }
    if (!req.body.supplierId || req.body.supplierId.trim() === "") {
        errors.push("Supplier is required");
    }

    if (errors.length > 0) {
        return res.status(400).json({message: errors[0]});
    }
};

exports.validateProductUpdate = [
    body("name").optional().notEmpty().withMessage("Name cannot be empty"),
    body("sku").optional().notEmpty().withMessage("SKU cannot be empty"),
    body("price").optional().isFloat({min:0}).withMessage("Price must be >= 0"),
    body("minStock").optional().isInt({min:0}).withMessage("minStock must be >= 0"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
];