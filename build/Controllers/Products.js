"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.addProductToFavorites = exports.increaseProductView = exports.findProductController = exports.getRecentProductsController = exports.searchProductsController = exports.getProductsController = exports.createProductController = void 0;
var Products_1 = require("../Models/Products");
var Reviews_1 = require("../Models/Reviews");
var Product_1 = require("../Validators/Product");
var utils_1 = require("../utils/utils");
// Passed
// Creating product
exports.createProductController = (0, utils_1.tryCatchWrapper)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var validated, createdProduct;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Product_1.createProductSchema.validateAsync(req.body)];
            case 1:
                validated = _a.sent();
                if (!validated)
                    throw new Error('ValidationError');
                if (req.body.secret !== 'lkjangknvjknakv413nk5ajiojkvhjo4h9u390jngjfpo2n84hgvjnd') {
                    res.status(400);
                    res.json({
                        success: false,
                        message: 'Secret Not Valid'
                    });
                }
                else
                    delete req.body.secret;
                return [4 /*yield*/, (0, Products_1.createProduct)(req.body)];
            case 2:
                createdProduct = _a.sent();
                if (!createdProduct) {
                    res.status(500).json({
                        success: false,
                        message: 'Product couldnt be created.'
                    });
                }
                res.status(200);
                res.json({
                    success: true,
                    product: createdProduct
                });
                return [2 /*return*/];
        }
    });
}); });
// Passed
// Getting all products with limit and skip
exports.getProductsController = (0, utils_1.tryCatchWrapper)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, category, skip, subCategory, products, productsWithReviews;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, category = _a.category, skip = _a.skip, subCategory = _a.subCategory;
                return [4 /*yield*/, (0, Products_1.getAllProducts)(12, Number(skip || 0), category, subCategory)];
            case 1:
                products = _b.sent();
                console.log(products);
                console.log(products.length);
                return [4 /*yield*/, addReviews(products)
                    // if( user_id ) {
                    // 	const favoriteOnes = await markIfFavorite( user_id, productsWithReviews.map( product => product._id ) )
                    // 	console.log('favoriteOnes')
                    // 	console.log(favoriteOnes)
                    // 	if( favoriteOnes && favoriteOnes.length ) {
                    // 		productsWithReviews = productsWithReviews.map( product => {
                    // 			if( favoriteOnes.includes(product._id) ) product.favoritted = true
                    // 			return product
                    // 		})
                    // 	}
                    // }
                    // console.log('productsWithReviews')
                    // console.log(productsWithReviews)
                ];
            case 2:
                productsWithReviews = _b.sent();
                // if( user_id ) {
                // 	const favoriteOnes = await markIfFavorite( user_id, productsWithReviews.map( product => product._id ) )
                // 	console.log('favoriteOnes')
                // 	console.log(favoriteOnes)
                // 	if( favoriteOnes && favoriteOnes.length ) {
                // 		productsWithReviews = productsWithReviews.map( product => {
                // 			if( favoriteOnes.includes(product._id) ) product.favoritted = true
                // 			return product
                // 		})
                // 	}
                // }
                // console.log('productsWithReviews')
                // console.log(productsWithReviews)
                res.status(200);
                res.json({
                    success: true,
                    products: productsWithReviews
                });
                return [2 /*return*/];
        }
    });
}); });
// Passed
// Getting all products with limit and skip
exports.searchProductsController = (0, utils_1.tryCatchWrapper)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tag, products, productsWithReviews;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                tag = req.params.tag;
                return [4 /*yield*/, (0, Products_1.searchProducts)(tag)];
            case 1:
                products = _a.sent();
                return [4 /*yield*/, addReviews(products)];
            case 2:
                productsWithReviews = _a.sent();
                res.status(200);
                res.json({
                    success: true,
                    products: productsWithReviews
                });
                return [2 /*return*/];
        }
    });
}); });
// Passed
// Getting all products with limit and skip
exports.getRecentProductsController = (0, utils_1.tryCatchWrapper)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, products, productsWithReviews;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, (0, Products_1.getRecentProducts)(id)];
            case 1:
                products = _a.sent();
                return [4 /*yield*/, addReviews(products)
                    // if( req.user && req.user._id ) {
                    // 	const favoriteOnes = await markIfFavorite( req.user._id, productsWithReviews.map( product => product._id ) )
                    // 	if( favoriteOnes && favoriteOnes.length ) {
                    // 		productsWithReviews = productsWithReviews.map( product => {
                    // 			if( favoriteOnes.includes(product._id) ) product.favoritted = true
                    // 			return product
                    // 		})
                    // 	}
                    // }
                    // console.log('productsWithReviews')
                    // console.log(productsWithReviews)
                ];
            case 2:
                productsWithReviews = _a.sent();
                // if( req.user && req.user._id ) {
                // 	const favoriteOnes = await markIfFavorite( req.user._id, productsWithReviews.map( product => product._id ) )
                // 	if( favoriteOnes && favoriteOnes.length ) {
                // 		productsWithReviews = productsWithReviews.map( product => {
                // 			if( favoriteOnes.includes(product._id) ) product.favoritted = true
                // 			return product
                // 		})
                // 	}
                // }
                // console.log('productsWithReviews')
                // console.log(productsWithReviews)
                res.status(200);
                res.json({
                    success: true,
                    products: productsWithReviews
                });
                return [2 /*return*/];
        }
    });
}); });
// Passed
// Getting a product with id
exports.findProductController = (0, utils_1.tryCatchWrapper)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var product, productReviews, rate, productWithReviews;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, Products_1.findProductWithId)(req.params.id)];
            case 1:
                product = _a.sent();
                if (!product || !product._id) {
                    res.status(400).json({
                        success: false,
                        message: 'product not found'
                    });
                }
                return [4 /*yield*/, (0, Reviews_1.findProductReviews)(product._id)];
            case 2:
                productReviews = _a.sent();
                rate = calculateProductRate(productReviews);
                productWithReviews = __assign(__assign({}, product), { reviews: productReviews || [], rate: rate });
                // if( req.user && req.user._id ) {
                // 	const favoriteOnes = await markIfFavorite( req.user._id, product._id )
                // 	if( favoriteOnes ) {
                // 		productWithReviews.favoritted = true
                // 	}
                // }
                // console.log('productWithReviews')
                // console.log(productWithReviews)
                res.status(200);
                res.json({
                    success: true,
                    product: productWithReviews
                });
                return [2 /*return*/];
        }
    });
}); });
// Passed
// Increase product views
exports.increaseProductView = (0, utils_1.tryCatchWrapper)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var validated, currentProduct, newView, views, updatedProduct;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Product_1.ProductViewSchema.validateAsync(req.body)];
            case 1:
                validated = _a.sent();
                if (!validated)
                    throw new Error('ValidationError');
                return [4 /*yield*/, (0, Products_1.findProductWithId)(req.body.id)];
            case 2:
                currentProduct = _a.sent();
                if (currentProduct.views) {
                    views = currentProduct.views;
                    newView = views + 1;
                }
                else {
                    newView = 1;
                }
                return [4 /*yield*/, (0, Products_1.updateProduct)(req.body.id, { views: newView })];
            case 3:
                updatedProduct = _a.sent();
                res.status(200);
                res.json({
                    success: true,
                    product: updatedProduct
                });
                return [2 /*return*/];
        }
    });
}); });
// Passed
// Increase product views
exports.addProductToFavorites = (0, utils_1.tryCatchWrapper)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var validated, createdFavorite;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Product_1.addProductToFavoritesSchema.validateAsync(req.body)];
            case 1:
                validated = _a.sent();
                if (!validated)
                    throw new Error('ValidationError');
                return [4 /*yield*/, (0, Products_1.toggleProductFavorites)(req.user._id, req.body.product_id)];
            case 2:
                createdFavorite = _a.sent();
                if (!createdFavorite) {
                    res.status(500);
                    res.json({
                        success: false
                    });
                }
                res.status(200);
                res.json({
                    success: true
                });
                return [2 /*return*/];
        }
    });
}); });
var addReviews = function (products) { return __awaiter(void 0, void 0, void 0, function () {
    var productWithReviews, _a, _b, _i, key, product, productReviews;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                productWithReviews = [];
                _a = [];
                for (_b in products)
                    _a.push(_b);
                _i = 0;
                _c.label = 1;
            case 1:
                if (!(_i < _a.length)) return [3 /*break*/, 4];
                key = _a[_i];
                product = products[key];
                return [4 /*yield*/, (0, Reviews_1.findProductReviews)(product._id)];
            case 2:
                productReviews = _c.sent();
                product.reviews = productReviews.length;
                product.rate = calculateProductRate(productReviews);
                productWithReviews.push(product);
                _c.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/, productWithReviews];
        }
    });
}); };
var markIfFavorite = function (user_id, product_ids) { return __awaiter(void 0, void 0, void 0, function () {
    var productInArray;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!!Array.isArray(product_ids)) return [3 /*break*/, 2];
                productInArray = [product_ids];
                return [4 /*yield*/, (0, Products_1.findUserFavorites)(user_id, productInArray)];
            case 1: return [2 /*return*/, _a.sent()];
            case 2: return [4 /*yield*/, (0, Products_1.findUserFavorites)(user_id, product_ids)];
            case 3: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var calculateProductRate = function (reviews) {
    var totalrate = 0;
    reviews.forEach(function (product) {
        if (product.rate) {
            totalrate += product.rate;
        }
    });
    return totalrate / reviews.length;
};
