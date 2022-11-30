"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Category_1 = require("../Controllers/Category");
var router = (0, express_1.Router)();
router.get('/categories', Category_1.getAllCategoriesController);
exports.default = router;
