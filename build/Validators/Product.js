"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProductToFavoritesSchema = exports.ProductViewSchema = exports.createProductSchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.createProductSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    photos: joi_1.default.array().required(),
    price: joi_1.default.number().required(),
    mainImage: joi_1.default.number().default(0),
    shipping: joi_1.default.string(),
    return: joi_1.default.string(),
    infoGuide: joi_1.default.string(),
    additionalInfo: joi_1.default.string(),
    views: joi_1.default.number(),
    options: joi_1.default.object(),
    intro: joi_1.default.object(),
    description: joi_1.default.string(),
    properties: joi_1.default.array(),
    stock: joi_1.default.number(),
    sku: joi_1.default.string(),
    category: joi_1.default.array(),
    subCategory: joi_1.default.array(),
    secret: joi_1.default.string().required(),
});
exports.ProductViewSchema = joi_1.default.object({
    id: joi_1.default.string().required()
});
exports.addProductToFavoritesSchema = joi_1.default.object({
    product_id: joi_1.default.string().required()
});
