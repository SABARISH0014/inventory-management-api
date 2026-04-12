const Supplier = require("../models/Supplier");

exports.createSupplier=async(data)=>{
    const supplier=await Supplier.create(data);
    return supplier;
};

exports.getSuppliers=async()=>{
    const suppliers=await Supplier.find();
    return suppliers;
}

exports.getSupplierById=async(id)=>{
    const supplier=await Supplier.findById(id);
    return supplier;
}

exports.updateSupplier=async(id,data)=>{
    const supplier=await Supplier.findByIdAndUpdate(id,data,{new:true});
    return supplier;
}

exports.deleteSupplier=async(id)=>{
    const supplier=await Supplier.findByIdAndDelete(id);
    return supplier;
}