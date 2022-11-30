"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrderSchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.createOrderSchema = joi_1.default.object({
    user_id: joi_1.default.string().required(),
    product_ids: joi_1.default.array().required(),
    total: joi_1.default.number().required(),
    address: joi_1.default.string().required(),
});
