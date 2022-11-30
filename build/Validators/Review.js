"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReviewSchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.createReviewSchema = joi_1.default.object({
    text: joi_1.default.string().required(),
    name: joi_1.default.string().required(),
    rate: joi_1.default.number().min(1).max(5).required(),
    product_id: joi_1.default.string().required(),
    user_id: joi_1.default.string().required(),
    replyTo: joi_1.default.string(),
    img: joi_1.default.string()
});
