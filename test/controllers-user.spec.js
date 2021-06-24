const { getUser, createUser } = require('../controllers/user');
const UserDao = require('../dao/user');
const ResponseHandler = require('../utils/response');
const sinon = require('sinon');
const { expect } = require('chai');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

describe('Testing User Controller', () => {
    before(() => {
        sinon.stub(UserDao, 'findOneUser');
        sinon.stub(ResponseHandler, 'getErrorResponseObject');
        sinon.stub(bcrypt, 'compare');
        sinon.stub(jwt, 'sign');
        sinon.stub(ResponseHandler, 'getSuccessResponseObject');
    });

    after(() => {
        UserDao.findOneUser.restore();
        ResponseHandler.getErrorResponseObject.restore();
        bcrypt.compare.restore();
        jwt.sign.restore();
        ResponseHandler.getSuccessResponseObject.restore();
    });

    it('Should throw error if user is not registered', () => {
        const req = {
            body : {
                email: 'abc@gmail.com',
                password: 'asddhbddh'
            }
        };

        UserDao.findOneUser.returns(Promise.resolve(null));
        
        ResponseHandler.getErrorResponseObject.returns(new Error('User not registered!'));

        getUser(req, {}, () => {}).then((result) => {
            expect(result).to.throw('User not registered!');
        });       
    });

    it('Should throw error if wrong password is entered', () => {
        const req = {
            body : {
                email: 'abc@gmail.com',
                password: 'asddhbddh23'
            }
        };

        UserDao.findOneUser.returns(Promise.resolve({
            isEmailVerfied: true,
            password: 'asddhbddh'
        }));
        
        ResponseHandler.getErrorResponseObject.returns(new Error('Wrong Password'));

        bcrypt.compare.returns(false);

        getUser(req, {}, () => {}).then((result) => {
            expect(result).to.throw('Wrong Password');
        });       
    });

    it('Should throw error if user email is not verified', () => {
        const req = {
            body : {
                email: 'abc@gmail.com',
                password: 'asddhbddh'
            }
        };

        UserDao.findOneUser.returns(Promise.resolve({
            isEmailVerfied: false,
            password: 'asddhbddh'
        }));
        
        bcrypt.compare.returns(true);

        ResponseHandler.getErrorResponseObject.returns(new Error('Account not verfied!'));

        getUser(req, {}, () => {}).then((result) => {
            expect(result).to.throw('Account not verfied!');
        });       
    });

    it('Should return SUCCESS if user is successfully logged in', () => {
        const req = {
            body : {
                email: 'abc@gmail.com',
                password: 'asddhbddh'
            }
        };

        UserDao.findOneUser.returns(Promise.resolve({
            isEmailVerfied: true,
            password: 'asddhbddh'
        }));
        
        bcrypt.compare.returns(true);

        jwt.sign.returns('hdhdbahdhhdbdhdhhajsa11bshjs');

        ResponseHandler.getSuccessResponseObject.returns({status: 'SUCCESS', data: {}});

        getUser(req, {}, () => {}).then((result) => {
            expect(result).to.returns('SUCCESS');
        });       
    });
});