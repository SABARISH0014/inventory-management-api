const supplierService = require("../services/supplierService");

exports.createSupplier = async (req, res) => {
    try{
        const data = req.body;
        const supplier = await supplierService.createSupplier(req.body);
        res.status(201).json(supplier);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.getSuppliers = async (req, res) => {
    try{
        const suppliers = await supplierService.getSuppliers();
        res.status(200).json(suppliers);
    }catch (error) {
        res.status(400).json({ message: error.message });

    }
}

exports.getSupplierById = async (req, res) => {
    try{
        const supplier = await supplierService.getSupplierById(req.params.id);
        res.status(200).json(supplier);
    }catch (error) {
        res.status(400).json({ message: error.message });
    }  
}       

exports.updateSupplier = async (req,res) =>{
    try{
        const supplier = await supplierService.updateSupplier(req.params.id,req.body);
        res.status(200).json(supplier);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.deleteSupplier = async(req,res) =>{
    try{
        const {id} = req.params;
        await supplierService.deleteSupplier(id);
        res.status(204).send();     
    }catch (error) {
        res.status(400).json({ message: error.message });
    }
}