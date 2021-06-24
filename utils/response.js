const responseHandler = {
    getErrorResponseObject : (errMsg, errStatusCode) => {
        const newError = new Error(errMsg);
        newError.statusCode = errStatusCode;
        return newError;
    },
    getSuccessResponseObject : (res, statusCode, statusMsg, data) => {
        res.status(statusCode).json({
            status: statusMsg,
            data: data
        });
    }
};

module.exports = responseHandler;