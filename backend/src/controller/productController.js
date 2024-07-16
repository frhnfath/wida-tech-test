const { Products } = require('../models');

const getProducts = async (req, res) => {
    try {
        const products = await Products.findAll({paranoid: false});
        return res.status(201).json({
            message: "Success",
            data: products
        })
    } catch (error) {
        console.log("Error get all products", error);
        return res.status(400).json({
            message: "Error",
            error
        })
    }
}

const addProduct = async (req, res) => {
        try {
            // validate if products already added
        const productData = await Products.findOne({where: {
            name: req.body.name
        }})
        console.log(productData)
        if (productData) {
            return res.status(400).json({
                message: "Data already added"
            })
        }
        let { name, price, quantity } = req.body
        console.log('product body', req.body);
        const newProduct = await Products.create({
            name,
            price,
            quantity
        });
        return res.status(201).json({
            message: "Products added successfully",
            data: newProduct
        })
    } catch (error) {
        return res.status(400).json({
            message: "error",
            error
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        let { id } = req.params;
        const product = await Products.findByPk(id);
        if (product) {
            await product.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({error: 'Product not found'});
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = {
    getProducts,
    addProduct,
    deleteProduct
}