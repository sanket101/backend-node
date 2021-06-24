const { validationResult } = require('express-validator');
const ProductDao = require('../dao/product');
const ResponseHandler = require('../utils/response');
const ErrorMsg = require('../utils/get-error-responses');

exports.getProductsDomainWise = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            throw ResponseHandler.getErrorResponseObject(ErrorMsg.INCORRECT_PARAMETERS, 422);
        }

        const { productDomain } = req.body;

        const result = await ProductDao.getProductsAsPerDomain({
            productDomain
        });

        if(!result) {
            throw ResponseHandler.getErrorResponseObject(ErrorMsg.DB_SERVICE_DOWN, 501);
        }

        if(result.length === 0) {
            throw ResponseHandler.getErrorResponseObject(ErrorMsg.NO_PRODUCTS_FOUND, 404);
        }

        ResponseHandler.getSuccessResponseObject(res, 201, 'SUCCESS', {
            products: result
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

exports.saveProduct = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            throw ResponseHandler.getErrorResponseObject(ErrorMsg.INCORRECT_PARAMETERS, 422);
        }

        const { name, description, price, productDomain, productCategory, genreCategory, sizeAvailable, colorsAvailable, images } = req.body;

        const result = await ProductDao.saveProduct({
            name,
            description,
            price,
            productDomain,
            productCategory,
            genreCategory,
            sizeAvailable,
            colorsAvailable,
            images
        });

        if(!result) {
            throw ResponseHandler.getErrorResponseObject(ErrorMsg.DB_SERVICE_DOWN, 501);
        }

        ResponseHandler.getSuccessResponseObject(res, 201, 'SUCCESS', {
            message: 'Product added successfully'
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
 
exports.updateProduct = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            throw ResponseHandler.getErrorResponseObject(ErrorMsg.INCORRECT_PARAMETERS, 422);
        }

        const updatedProduct = req.body;

        const productId = req.params.productId;

        const result = await ProductDao.getProduct({_id: productId});

        if(!result) {
            throw ResponseHandler.getErrorResponseObject(ErrorMsg.PRODUCT_NOT_FOUND, 404);
        }

        const newProduct = Object.assign(result, updatedProduct);
        
        const savedProduct = await ProductDao.updateProduct(newProduct);

        if(!savedProduct) {
            throw ResponseHandler.getErrorResponseObject(ErrorMsg.DB_SERVICE_DOWN, 501);
        }

        ResponseHandler.getSuccessResponseObject(res, 201, 'SUCCESS', {
            message: 'Product updated successfully',
            data: {
                product: savedProduct
            }
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

exports.deleteProduct = async (req, res, next) => {
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            throw ResponseHandler.getErrorResponseObject(ErrorMsg.INCORRECT_PARAMETERS, 422);
        }

        const { productId } = req.body;

        const result = await ProductDao.deleteProduct({
            _id: productId
        });

        if(!result) {
            throw ResponseHandler.getErrorResponseObject(ErrorMsg.PRODUCT_NOT_FOUND, 404);
        }

        ResponseHandler.getSuccessResponseObject(res, 201, 'SUCCESS', {
            message: 'Product deleted successfully'
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
