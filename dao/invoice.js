const Invoice = require('../models/invoice');

const invoiceSchema = {
    getAllInvoices: invoiceObj => {
        return Invoice.find(invoiceObj);
    },
    getInvoice: invoiceObj => {
        return Invoice.findOne(invoiceObj);
    },
    saveInvoice: invoiceObj => {
        const newInvoice = new Invoice(invoiceObj);
        return newInvoice.save();
    }
};

module.exports = invoiceSchema;