"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var SubCategory_1 = require("../Controllers/SubCategory");
var router = (0, express_1.Router)();
router.get('/subcategories', SubCategory_1.getAllSubCategoriesController);
exports.default = router;
