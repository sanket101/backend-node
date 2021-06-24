const { validationResult } = require('express-validator');
const AddressDao = require('../dao/address');
const ResponseHandler = require('../utils/response');
const ErrorMsg = require('../utils/get-error-responses');

exports.saveAddress = async (req, res, next) => {
    
    const errors = validationResult(req);

    try {
        if(!errors.isEmpty()){
            throw ResponseHandler.getErrorResponseObject(ErrorMsg.INCORRECT_PARAMETERS, 422);
        }
    
        const { tag, city, state, country, pincode, deliveryAddress, name, phoneNumber, isPhoneNumberVerified, userId, landmark } = req.body;
    
        const result = await AddressDao.saveAddress({
            tag: tag ? tag : '',
            city: city,
            state: state,
            country: country,
            pincode: pincode,
            deliveryAddress: deliveryAddress,
            name: name,
            phoneNumber: phoneNumber,
            isPhoneNumberVerified: isPhoneNumberVerified ? isPhoneNumberVerified : false,
            userId: userId,
            landmark: landmark ? landmark : ''
        });

        if(result) {
            ResponseHandler.getSuccessResponseObject(res, 201, 'SUCCESS', {
                message: 'Address added successfully'
            });
        }

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

exports.getAllAddresses = async (req, res, next) => {

    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            throw ResponseHandler.getErrorResponseObject(ErrorMsg.INCORRECT_PARAMETERS, 422);
        }

        const { userId } = req.body;

        const result = await AddressDao.getAllAddress({
            userId: userId
        });

        if(!result) {
            throw ResponseHandler.getErrorResponseObject(ErrorMsg.ADDRESS_NOT_FOUND, 404);
        }

        ResponseHandler.getSuccessResponseObject(res, 201, 'SUCCESS', {
            customerAddresses: result
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

exports.updateAddress = async (req, res, next) => {
    const errors = validationResult(req);

    try {
        if(!errors.isEmpty()){
            throw ResponseHandler.getErrorResponseObject(ErrorMsg.INCORRECT_PARAMETERS, 422);
        }

        const updatedAddress = req.body;

        const addressId = req.params.addressId;

        const result = await AddressDao.getAddress({_id : addressId});

        if(!result){
            throw ResponseHandler.getErrorResponseObject(ErrorMsg.ADDRESS_NOT_FOUND, 404);
        }

        const newAddress = Object.assign(result, updatedAddress);

        const savedResult = await AddressDao.updateAddress(newAddress);

        if(!savedResult) {
            throw ResponseHandler.getErrorResponseObject(ErrorMsg.DB_SERVICE_DOWN, 501);
        }

        ResponseHandler.getSuccessResponseObject(res, 201, 'SUCCESS', {
            message: 'Address updated successfully',
            data: {
                address: savedResult
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

exports.deleteAddress = async (req, res, next) => {
    
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            throw ResponseHandler.getErrorResponseObject(ErrorMsg.INCORRECT_PARAMETERS, 422);
        }

        const { addressId } = req.body;

        const result = await AddressDao.deleteAddress({
            _id: addressId
        });

        if(!result) {
            throw ResponseHandler.getErrorResponseObject(ErrorMsg.ADDRESS_NOT_FOUND, 404);
        }

        ResponseHandler.getSuccessResponseObject(res, 201, 'SUCCESS', {
            message: 'Deleted Successfully'
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