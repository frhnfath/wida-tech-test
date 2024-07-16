const express = require('express');
const router = express.Router();
const invoiceController = require('../controller/invoiceController');

getAllInvoicesRoute = router.get('/all', invoiceController.getAllInvoices);

createInvoiceRoute = router.post('/create', invoiceController.createInvoice);

submitInvoiceRoute = router.post('/submit', invoiceController.submitInvoice);

addProductToInvoiceRoute = router.post('/add', invoiceController.addProductToInvoice);

removeProductFromInvoiceRoute = router.delete('/remove', invoiceController.removeProductFromInvoice);

module.exports = router;