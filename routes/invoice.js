const express = require('express');

const invoiceController = require('../controllers/invoice');

const router = express.Router();

const { body } = require('express-validator');

// GET /invoice/get-invoice
router.get('/get-invoice/:invoiceId', invoiceController.getInvoice);

// POST /invoice/get-all-invoices
router.post('/get-all-invoices',
    body('userId').isMongoId(),
    invoiceController.getAllInvoices
);

// POST /invoice/save-invoice
router.post('/save-invoice',
    body('userId').isMongoId(),
    body('orders').isArray({min: 1}),
    body('totalOrderAmount').isNumeric(),
    body('shippingAmount').isNumeric(),
    body('taxAmount').isNumeric(),
    invoiceController.saveInvoice
);