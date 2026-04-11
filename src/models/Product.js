const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
    {
        name: {
            type: String,
            required: true ,
            trim: true
        },
        sku: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        quantity: {
            type: Number,
            default: 0,
            min: 0
        },
        minStock: {
            type: Number,
            required: true,
            min: 0
        },
        supplierId: {
            type: Schema.Types.ObjectId,
            ref: "Supplier",
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;