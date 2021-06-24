const { validationResult } = require('express-validator');
const InvoiceDao = require('../dao/invoice');
const ResponseHandler = require('../utils/response');
const ErrorMsg = require('../utils/get-error-responses');

exports.getAllInvoices = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            throw ResponseHandler.getErrorResponseObject(ErrorMsg.INCORRECT_PARAMETERS, 422);
        }

        const { userId } = req.body;

        const result = await InvoiceDao.getAllInvoices({
            userId
        });

        if(!result) {
            throw ResponseHandler.getErrorResponseObject(ErrorMsg.NO_INVOICE_FOUND, 404);
        }

        ResponseHandler.getSuccessResponseObject(res, 201, 'SUCCESS', {
            customerInvoices: result
        });

        return 'SUCCESS';
    }
    catch(err) {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
        return err;
    }
};

exports.saveInvoice = async (req, res, next) => {
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            throw ResponseHandler.getErrorResponseObject(ErrorMsg.INCORRECT_PARAMETERS, 422);
        }

        const { userId, orders, giftWrap, giftMessage, additionalComments, totalOrderAmount, shippingAmount, taxAmount, discountCode, discountAmount } = req.body;

        const result = await InvoiceDao.saveInvoice({
            userId,
            orders,
            giftWrap: giftWrap ? giftWrap : false,
            giftMessage: giftMessage ? giftMessage : '',
            additionalComments: additionalComments ? additionalComments : '',
            totalOrderAmount,
            shippingAmount,
            taxAmount,
            discountCode: discountCode ? discountCode : '',
            discountAmount: (discountCode && discountAmount) ? discountAmount : 0 
        });

        if(!result) {
            throw ResponseHandler.getErrorResponseObject(ErrorMsg.DB_SERVICE_DOWN, 500);
        }

        ResponseHandler.getSuccessResponseObject(res, 201, 'SUCCESS', {
            message: 'Invoice Created Succesfully'
        });

        return 'SUCCESS';
    }
    catch(err) {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
        return err;
    }
};

exports.getInvoice = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            throw ResponseHandler.getErrorResponseObject(ErrorMsg.INCORRECT_PARAMETERS, 422);
        }

        const invoiceId = req.params.invoiceId;

        const result = await InvoiceDao.getInvoice({
            _id : invoiceId 
        });

        if(!result) {
            throw ResponseHandler.getErrorResponseObject(ErrorMsg.INVOICE_NOT_FOUND, 501);
        }

        ResponseHandler.getSuccessResponseObject(res, 200, 'SUCCESS', {
            message: 'SUCCESS',
            data: result
        });

        return 'SUCCESS';
    }
    catch(err) {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
        return err;
    }
};