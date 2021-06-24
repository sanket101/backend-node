const { expect } = require('chai');
const authMiddleware = require('../middleware/is-auth');
const sinon = require('sinon');
const ResponseHandler = require('../utils/response');
const jwt = require('jsonwebtoken');

describe('Testing Authentication Middleware', () => {

    it('Should throw an error if no authorization header is present', () => {
        const req = {
            get: (headerName) => { return null }
        };
        sinon.stub(ResponseHandler, 'getErrorResponseObject');
        ResponseHandler.getErrorResponseObject.returns(new Error('Not Authenticated!'));
        expect(authMiddleware.bind(this, req, {}, () => {})).to.throw('Not Authenticated!');
        ResponseHandler.getErrorResponseObject.restore();
    });

    it('Should throw an error if authorization header contains only one string', () => {
        const req = {
            get: (headerName) => { return 'xyz' }
        };
        expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
    });

    it('Should throw an error if token is not verified', () => {
        const req = {
            get: (headerName) => { return 'Bearer axsbddhdsfdbfsdssn'; }
        };
        sinon.stub(jwt, 'verify');
        sinon.stub(ResponseHandler, 'getErrorResponseObject');
        ResponseHandler.getErrorResponseObject.returns(new Error('Not Authenticated!'));
        jwt.verify.returns(null);
        expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
        jwt.verify.restore();
        ResponseHandler.getErrorResponseObject.restore();
    });

    it('Should return userId if token is verified', () => {
        const req = {
            get: (headerName) => { return 'Bearer axsbddhdsfdbfsdssn'; }
        };
        sinon.stub(jwt, 'verify');
        jwt.verify.returns({ userId: 'ashdbdhkd' });
        authMiddleware(req, {}, () => {});
        expect(req).to.have.property('userId');
        jwt.verify.restore();
    });
});