const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');

getAllProductRoute = router.get('/all', productController.getProducts);

addProductRoute = router.post('/add', productController.addProduct);

deleteProductRoute = router.delete('/delete/:id', productController.deleteProduct);

module.exports = router;