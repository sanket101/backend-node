const { validationResult } = require('express-validator');
const OrderDao = require('../dao/order');
const ResponseHandler = require('../utils/response');
const ErrorMsg = require('../utils/get-error-responses');

exports.addOrder = async (req, res, next) => {
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            throw ResponseHandler.getErrorResponseObject(ErrorMsg.INCORRECT_PARAMETERS, 422);
        }

        const { userId, productId, quantity, size, color, status } = req.body;

        const result = await OrderDao.saveOrder({
            userId,
            productId,
            quantity, 
            size, 
            color, 
            status
        });

        if(!result) {
            throw ResponseHandler.getErrorResponseObject(ErrorMsg.DB_SERVICE_DOWN, 501);
        }

        ResponseHandler.getSuccessResponseObject(res, 201, 'SUCCESS', {
            message: 'Order added successfully'
        });

        return 'SUCCESS';
    }
    catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
        return err;
    }
};

exports.getOrders = async (req, res, next) => {
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            throw ResponseHandler.getErrorResponseObject(ErrorMsg.INCORRECT_PARAMETERS, 422);
        }

        const { filterParameter, uniqueId } = req.body;

        let result;

        if(filterParameter === 'PRODUCT'){
            result = await OrderDao.getAllOrders({
                productId: uniqueId
            }); 
        }
        else{
            result = await OrderDao.getAllOrders({
                userId: uniqueId
            });
        }

        if(!result) {
            throw ResponseHandler.getErrorResponseObject(ErrorMsg.DB_SERVICE_DOWN, 501);
        }

        ResponseHandler.getSuccessResponseObject(res, 201, 'SUCCESS', {
            message: 'SUCCESS',
            data: {
                orders: result
            }
        });

        return 'SUCCESS';
    }
    catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
        return err;
    }
};

exports.updateOrder = async (req, res, next) => {

    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            throw ResponseHandler.getErrorResponseObject(ErrorMsg.INCORRECT_PARAMETERS, 422);
        }

        const orderId = req.params.orderId;

        if(!orderId){
            throw ResponseHandler.getErrorResponseObject(ErrorMsg.INCORRECT_PARAMETERS, 422);
        }
        
        const result = await OrderDao.getOrder({_id: orderId});

        if(!result) {
            throw ResponseHandler.getErrorResponseObject(ErrorMsg.NO_ORDER_FOUND, 404);
        }

        const updatedOrder = req.body;

        const newOrder = Object.assign(result, updatedOrder);

        const savedResult = await OrderDao.updateOrder(newOrder);

        if(!savedResult) {
            throw ResponseHandler.getErrorResponseObject(ErrorMsg.DB_SERVICE_DOWN, 501);
        }

        ResponseHandler.getSuccessResponseObject(res, 201, 'SUCCESS', {
            message: 'Order updated successfully',
            data: {
                review: savedResult
            }
        });

        return 'SUCCESS';
    }
    catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
        return err;
    }
};

exports.deleteOrder = async (req, res, next) => {

    try{
        const orderId  = req.params.orderId;

        if(!orderId){
            throw ResponseHandler.getErrorResponseObject(ErrorMsg.INCORRECT_PARAMETERS, 422);
        }

        const result = await OrderDao.deleteOrder({
            _id: orderId
        });

        if(!result) {
            throw ResponseHandler.getErrorResponseObject(ErrorMsg.DB_SERVICE_DOWN, 501);
        }

        ResponseHandler.getSuccessResponseObject(res, 201, 'SUCCESS', {
            message: 'Order Deleted Successfully'
        });

        return 'SUCCESS';
    }
    catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
        return err;
    }
};