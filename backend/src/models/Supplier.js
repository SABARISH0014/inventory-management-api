const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        trim : true,
        unique : true
    },
    phone : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    }
},{
    timestamps : true
});

const Supplier = mongoose.model("Supplier", supplierSchema);

module.exports = Supplier;