const { Invoice } = require('../models');
const { Invoice_has_product } = require('../models');
const { Products } = require('../models');

const getAllInvoices = async (req, res) => {
    try {
        const invoicesData = await Invoice.findAll({
            where: {
                isSubmitted: true
            }
        })
        return res.status(200).json({
            status: "Success",
            data: invoicesData
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Error",
            error
        })
    }
}

const createInvoice = async (req, res) => {
    try {
        const newInvoice = await Invoice.create({
            user_id: req.body.user_id
        });
        return res.status(201).json({
            message: "Invoice Successfully Created",
            data: {
                "invoice_id": newInvoice.id
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Error",
            error
        })
    }
}

const addProductToInvoice = async (req, res) => {
    try {
        const newProduct = await Invoice_has_product.create({
            invoice_id: req.body.invoice_id,
            product_id: req.body.product_id,
            quantity: req.body.quantity
        });
        const productDetail = await Products.findByPk(req.body.product_id);
        return res.status(201).json({
            message:  "Product added",
            data: {
                "invoice_id": req.body.id,
                "Product Name": productDetail.name
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Error",
            error
        })
    }
}

const removeProductFromInvoice = async (req, res) => {
    try {
        const product = await Invoice_has_product.findOne({
            where: {
                invoice_id: req.body.invoice_id,
                product_id: req.body.product_id
            }
        })
        if (product) {
            await product.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({error: 'Product not found'});
        }
    } catch (error) {
        console.log('Error removing product from invoice', error)
        res.status(500).json({error: error.message});
    }
}

const submitInvoice = async (req, res) => {
    try {
        const invoice = await Invoice.findByPk(req.body.invoice_id);
        if (invoice) {
            // update data
            invoice.isSubmitted = true
            await invoice.save();
            res.status(200).json({message: "Invoice Submitted"});
        } else {
            res.status(404).json({error: 'Invoice not found'});
        }
    } catch (error) {
        console.log('Error updating invoice:', error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAllInvoices,
    createInvoice,
    addProductToInvoice,
    removeProductFromInvoice,
    submitInvoice
}