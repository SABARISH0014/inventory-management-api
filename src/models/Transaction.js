import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },

    type: {
        type: String,
        enum: ["IN", "OUT"],
        required: true
    },

    quantity: {
        type: Number,
        required: true,
    },

    date: {
        type:Date,
        default: Date.now
    },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;

