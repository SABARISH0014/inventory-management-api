const {body, validationResult} = require("express-validator");

exports.validateProduct = [
    body("name").notEmpty().withMessage("Name is required"),
    body("sku").notEmpty().withMessage("SKU is required"),
    body("price").isFloat({min:0}).withMessage("Price must be >= 0"),
    body("minStock").isInt({min:0}).withMessage("minStock must be >= 0"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
];