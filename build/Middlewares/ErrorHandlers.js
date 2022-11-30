"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.errorMiddleWare = void 0;
var errorMiddleWare = function (req, res, next) {
    var error = new Error("Not Found - " + req.originalUrl);
    res.status(404);
    next(error);
};
exports.errorMiddleWare = errorMiddleWare;
var errorHandler = function (error, req, res, next) {
    var statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    console.log('In Error Handler');
    res.status(statusCode);
    res.json({
        success: false,
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? '' : error.stack
    });
};
exports.errorHandler = errorHandler;
