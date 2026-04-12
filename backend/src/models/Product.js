const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const generateSKU = () => {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `SKU-${timestamp}-${random}`;
};

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

ProductSchema.pre("save", function() {
    if (!this.sku || this.sku.trim() === "") {
        this.sku = generateSKU();
    }
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;