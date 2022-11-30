"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertContactForm = exports.insertDiscountToken = exports.insertResetToken = exports.updateUser = exports.getUserFavorites = exports.createUser = exports.getUserImg = exports.getUserRT = exports.getUserPass = exports.getUserByUsername = exports.getUserCred = exports.getUserOrders = exports.getUserWishlist = exports.getUserAdd = exports.getUserInfo = void 0;
var mongodb_1 = require("mongodb");
var index_1 = require("../db/index");
var userInfoObj = {
    email: 1,
    phone: 1,
    img: 1,
    name: 1,
    lastName: 1,
    companyName: 1,
};
var userAddressObj = {
    address: 1,
    zipcode: 1,
    city: 1,
    country: 1,
};
var userCredObj = {
    refreshToken: 1
};
var getUserInfo = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = new mongodb_1.ObjectID(id);
                return [4 /*yield*/, (0, index_1.findOne)('users', { _id: userId }, { projection: userInfoObj })];
            case 1:
                user = _a.sent();
                return [2 /*return*/, user];
        }
    });
}); };
exports.getUserInfo = getUserInfo;
var getUserAdd = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = new mongodb_1.ObjectID(id);
                return [4 /*yield*/, (0, index_1.findOne)('users', { _id: userId }, { projection: userAddressObj })];
            case 1:
                user = _a.sent();
                return [2 /*return*/, user];
        }
    });
}); };
exports.getUserAdd = getUserAdd;
var getUserWishlist = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var wishList, productIds, products;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, index_1.findMany)('favorites', { userId: id }, { projection: { productId: 1 } })];
            case 1:
                wishList = _a.sent();
                productIds = wishList.map(function (_a) {
                    var productId = _a.productId;
                    return new mongodb_1.ObjectID(productId);
                });
                return [4 /*yield*/, (0, index_1.findMany)('products', { _id: { $in: productIds } })];
            case 2:
                products = _a.sent();
                return [2 /*return*/, products];
        }
    });
}); };
exports.getUserWishlist = getUserWishlist;
var getUserOrders = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, index_1.findOne)('orders', { userId: id })];
            case 1:
                user = _a.sent();
                return [2 /*return*/, user];
        }
    });
}); };
exports.getUserOrders = getUserOrders;
var getUserCred = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = new mongodb_1.ObjectID(id);
                return [4 /*yield*/, (0, index_1.findOne)('users', { _id: userId }, { projection: userCredObj })];
            case 1:
                user = _a.sent();
                return [2 /*return*/, user];
        }
    });
}); };
exports.getUserCred = getUserCred;
var getUserByUsername = function (username) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, index_1.findOne)('users', { $or: [{ username: username }, { email: username }] }, { projection: { password: 1, username: 1, email: 1 } })];
            case 1:
                user = _a.sent();
                return [2 /*return*/, user];
        }
    });
}); };
exports.getUserByUsername = getUserByUsername;
var getUserPass = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = new mongodb_1.ObjectID(id);
                return [4 /*yield*/, (0, index_1.findOne)('users', { _id: userId }, { projection: { password: 1 } })];
            case 1:
                user = _a.sent();
                return [2 /*return*/, user];
        }
    });
}); };
exports.getUserPass = getUserPass;
var getUserRT = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = new mongodb_1.ObjectID(id);
                return [4 /*yield*/, (0, index_1.findOne)('users', { _id: userId }, { projection: { refreshToken: 1 } })];
            case 1:
                user = _a.sent();
                return [2 /*return*/, user];
        }
    });
}); };
exports.getUserRT = getUserRT;
var getUserImg = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = new mongodb_1.ObjectID(id);
                return [4 /*yield*/, (0, index_1.findOne)('users', { _id: userId }, { projection: { img: 1 } })];
            case 1:
                user = _a.sent();
                return [2 /*return*/, user];
        }
    });
}); };
exports.getUserImg = getUserImg;
var createUser = function (newUser) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, index_1.insertOne)('users', newUser)];
            case 1:
                user = _a.sent();
                return [2 /*return*/, user.insertedId ? user.ops[0] : 0];
        }
    });
}); };
exports.createUser = createUser;
var getUserFavorites = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, index_1.findMany)('favorites', { userId: userId }, { projection: { productId: 1 } })];
            case 1:
                user = _a.sent();
                return [2 /*return*/, user];
        }
    });
}); };
exports.getUserFavorites = getUserFavorites;
var updateUser = function (rowId, updateFields) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = new mongodb_1.ObjectID(rowId);
                return [4 /*yield*/, (0, index_1.updateOne)('users', { _id: userId }, { $set: updateFields })];
            case 1:
                user = _a.sent();
                return [2 /*return*/, user === null || user === void 0 ? void 0 : user.result.ok];
        }
    });
}); };
exports.updateUser = updateUser;
var insertResetToken = function (token, email, userId) { return __awaiter(void 0, void 0, void 0, function () {
    var isSubscribed, sessionReset;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, index_1.findOne)('reset_sessions', { userId: userId, valid: 1 })];
            case 1:
                isSubscribed = _a.sent();
                if (!isSubscribed) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, index_1.updateOne)('reset_sessions', { userId: userId, valid: 1 }, { $set: { valid: 0 } })];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [4 /*yield*/, (0, index_1.insertOne)('reset_sessions', { token: token, email: email, userId: userId, valid: 1 })];
            case 4:
                sessionReset = _a.sent();
                return [2 /*return*/, sessionReset];
        }
    });
}); };
exports.insertResetToken = insertResetToken;
var insertDiscountToken = function (token, email) { return __awaiter(void 0, void 0, void 0, function () {
    var isSubscribed, discount;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, index_1.findOne)('subscribers', { email: email })];
            case 1:
                isSubscribed = _a.sent();
                if (isSubscribed)
                    return [2 /*return*/, { code: 1 }];
                return [4 /*yield*/, (0, index_1.insertOne)('subscribers', { email: email })];
            case 2:
                _a.sent();
                return [4 /*yield*/, (0, index_1.insertOne)('discounts', { token: token, email: email, sale: 20 })];
            case 3:
                discount = _a.sent();
                return [2 /*return*/, discount];
        }
    });
}); };
exports.insertDiscountToken = insertDiscountToken;
var insertContactForm = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var contact;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, index_1.insertOne)('contacts', data)];
            case 1:
                contact = _a.sent();
                return [2 /*return*/, contact];
        }
    });
}); };
exports.insertContactForm = insertContactForm;
