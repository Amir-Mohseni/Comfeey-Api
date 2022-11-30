"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Reviews_1 = require("../Controllers/Reviews");
var User_1 = require("../Middlewares/User");
var router = (0, express_1.Router)();
router.post('/review', User_1.mustBeAuthenticated, Reviews_1.createReviewController);
exports.default = router;
