const moongoose = require("mongoose");

const supplierSchema = new moongoose.schema({
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