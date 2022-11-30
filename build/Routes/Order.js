"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Order_1 = require("../Controllers/Order");
var User_1 = require("../Middlewares/User");
var router = (0, express_1.Router)();
router.post('/order', User_1.mustBeAuthenticated, Order_1.CreateOrderController);
exports.default = router;
