const { validationResult } = require('express-validator');
const ReviewDao = require('../dao/review');
const ResponseHandler = require('../utils/response');
const ErrorMsg = require('../utils/get-error-responses');

exports.addReview = async (req, res, next) => {
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            throw ResponseHandler.getErrorResponseObject(ErrorMsg.INCORRECT_PARAMETERS, 422);
        }

        const { userId, productId, description, ratings } = req.body;

        const result = await ReviewDao.saveReview({
            userId,
            productId,
            description,
            ratings
        });

        if(!result) {
            throw ResponseHandler.getErrorResponseObject(ErrorMsg.DB_SERVICE_DOWN, 501);
        }

        ResponseHandler.getSuccessResponseObject(res, 201, 'SUCCESS', {
            message: 'Review added successfully'
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

exports.getReviews = async (req, res, next) => {
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            throw ResponseHandler.getErrorResponseObject(ErrorMsg.INCORRECT_PARAMETERS, 422);
        }

        const { filterParameter, uniqueId } = req.body;

        let result;

        if(filterParameter === 'PRODUCT'){
            result = await ReviewDao.getAllReviews({
                productId: uniqueId
            }); 
        }
        else{
            result = await ReviewDao.getAllReviews({
                userId: uniqueId
            });
        }

        if(!result) {
            throw ResponseHandler.getErrorResponseObject(ErrorMsg.DB_SERVICE_DOWN, 501);
        }

        ResponseHandler.getSuccessResponseObject(res, 201, 'SUCCESS', {
            message: 'SUCCESS',
            data: {
                reviews: result
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

exports.updateReview = async (req, res, next) => {

    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            throw ResponseHandler.getErrorResponseObject(ErrorMsg.INCORRECT_PARAMETERS, 422);
        }

        const reviewId = req.params.reviewId;

        if(!reviewId){
            throw ResponseHandler.getErrorResponseObject(ErrorMsg.INCORRECT_PARAMETERS, 422);
        }
        
        const result = await ReviewDao.getReview({_id: reviewId});

        if(!result) {
            throw ResponseHandler.getErrorResponseObject(ErrorMsg.NO_REVIEW_FOUND, 404);
        }

        const updatedReview = req.body;

        const newReview = Object.assign(result, updatedReview);

        const savedResult = await ReviewDao.updateReview(newReview);

        if(!savedResult) {
            throw ResponseHandler.getErrorResponseObject(ErrorMsg.DB_SERVICE_DOWN, 501);
        }

        ResponseHandler.getSuccessResponseObject(res, 201, 'SUCCESS', {
            message: 'Review updated successfully',
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

exports.deleteReview = async (req, res, next) => {

    try{
        const reviewId  = req.params.reviewId;

        if(!reviewId){
            throw ResponseHandler.getErrorResponseObject(ErrorMsg.INCORRECT_PARAMETERS, 422);
        }

        const result = await ReviewDao.deleteReview({
            _id: reviewId
        });

        if(!result) {
            throw ResponseHandler.getErrorResponseObject(ErrorMsg.DB_SERVICE_DOWN, 501);
        }

        ResponseHandler.getSuccessResponseObject(res, 201, 'SUCCESS', {
            message: 'Review Deleted Successfully'
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