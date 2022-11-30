"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContactFormSchema = exports.getUserFavsSchema = exports.forgotSchema = exports.loginSchema = exports.updateUserPassSchema = exports.updateUserSchema = exports.createUserSchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.createUserSchema = joi_1.default.object({
    username: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
    email: joi_1.default.string()
});
exports.updateUserSchema = joi_1.default.object({
    email: joi_1.default.string(),
    phone: joi_1.default.string(),
    img: joi_1.default.string(),
    name: joi_1.default.string(),
    lastName: joi_1.default.string(),
    companyName: joi_1.default.string(),
    address: joi_1.default.string(),
    zipcode: joi_1.default.string(),
    city: joi_1.default.string(),
    country: joi_1.default.string(),
});
exports.updateUserPassSchema = joi_1.default.object({
    currentPass: joi_1.default.string().required(),
    newPass: joi_1.default.string().min(6).required(),
});
exports.loginSchema = joi_1.default.object({
    username: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
});
exports.forgotSchema = joi_1.default.object({
    username: joi_1.default.string().required()
});
exports.getUserFavsSchema = joi_1.default.object({
    userId: joi_1.default.string().required()
});
exports.createContactFormSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    subject: joi_1.default.string().required(),
    message: joi_1.default.string().required(),
});
