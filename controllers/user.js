const User = require('../models/user');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserDao = require('../dao/user');
const ResponseHandler = require('../utils/response');
const ErrorMsg = require('../utils/get-error-responses');

exports.getUser = async (req, res, next) => {
  // TODO: validation for these fields
  const { email, password } = req.body;

  let loadedUser;
  try {
    const result = await UserDao.findOneUser({email: email});
    if(!result) { 
      throw ResponseHandler.getErrorResponseObject(ErrorMsg.USER_NOT_REGISTERED, 401);
    }
    loadedUser = result;
    const isEqual = bcrypt.compare(password, loadedUser.password);

    if(!isEqual){
      throw ResponseHandler.getErrorResponseObject(ErrorMsg.WRONG_PASSWORD, 401);
    }

    if(!loadedUser.isEmailVerfied) {
      throw ResponseHandler.getErrorResponseObject(ErrorMsg.ACC_NOT_VERIFIED, 401);
    }
    
    const token = jwt.sign({
        email: loadedUser.email,
        userId: loadedUser._id.toString()
      },
      'secretkeyforregisteringtokeninauniquewaythatnoonecouldthinkof',
      { expiresIn: '1h' }
    );
    // TODO: handle case when user's profile is not verified
    ResponseHandler.getSuccessResponseObject(res, 200, 'SUCCESS', {
      token: token,
      user: loadedUser
    });

    return 'SUCCESS';
  } catch (err) {
    if(!err.statusCode){
      err.statusCode = 500;
    }
    next(err);
    return err;
  }
};

exports.createUser = (req, res, next) => {
  // TODO: validation for these fields
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    throw ResponseHandler.getErrorResponseObject(ErrorMsg.INCORRECT_PARAMETERS, 422);
  }

  const { name, email, password }  = req.body;

  bcrypt.hash(password, 12).then(
    hashedPwd => {
      return UserDao.saveUser({
        email: email,
        name: name,
        password: hashedPwd
      });
    }
  )
  .then(
    result => {
      ResponseHandler.getSuccessResponseObject(res, 201, 'SUCCESS', {
        message: 'User registered successfully',
      });
    }
  )
  .catch(
    err => {
      if(!err.statusCode){
        err.statusCode = 500;
      }
      next(err);
    }
  );
};

exports.deleteUser = async (req, res, next) => {
  const { email, userId } = req.body;
  try{
    const result = await UserDao.deleteUser({_id: userId, email: email})

    if(!result) {
      throw ResponseHandler.getErrorResponseObject(ErrorMsg.USER_NOT_FOUND, 401)
    }

    ResponseHandler.getSuccessResponseObject(res, 200, 'SUCCESS', {
      message: 'Deleted Successfully'
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