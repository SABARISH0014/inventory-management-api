const Supplier = required("../models/Suppliers.js");

exports.createSupplier=async(data)=>{
    const supplier=await Supplier.create(data);
    return supplier;
};

exports.getSuppliers=async()=>{
    const suppliers=await Supplier.find();
    return suppliers;
}

exports.getSuppliersById=async(id)=>{
    const suppliers=await Supplier.findById(id);
    return suppliers;
}

exports.updateSuppliers=async(id,data)=>{
    const suppliers=await Supplier.findByIdAndUpdate(id,data,{new:true});
    return suppliers;
}

exports.deleteSuppliers=async(id)=>{
    const suppliers=await Suppliers.findByIdAndDelete(id);
    return suppliers
}