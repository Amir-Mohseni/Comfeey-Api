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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUserPhotoController = exports.uploadUserPhotoController = exports.createContactFormController = exports.refreshUserTokenController = exports.checkUserController = exports.updateUserPassController = exports.updateUserController = exports.getUserController = exports.createDiscountToken = exports.fetchUserOrders = exports.fetchUserWishlist = exports.fetchUserAddress = exports.fetchUserInfo = exports.logoutController = exports.forgotPassController = exports.loginController = exports.createUserController = void 0;
var Users_1 = require("../Models/Users");
var Orders_1 = require("../Models/Orders");
var User_1 = require("../Validators/User");
var utils_1 = require("../utils/utils");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var emailjs_com_1 = __importDefault(require("emailjs-com"));
var uuid_1 = require("uuid");
// Passed
// Creating User
exports.createUserController = (0, utils_1.tryCatchWrapper)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var validated, password, salt, _a, createdUser, _id, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, User_1.createUserSchema.validateAsync(req.body)];
            case 1:
                validated = _b.sent();
                if (!validated)
                    throw new Error('ValidationError');
                password = req.body.password;
                return [4 /*yield*/, bcrypt_1.default.genSalt()];
            case 2:
                salt = _b.sent();
                _a = req.body;
                return [4 /*yield*/, bcrypt_1.default.hash(password, salt)];
            case 3:
                _a.password = _b.sent();
                return [4 /*yield*/, (0, Users_1.createUser)(req.body)];
            case 4:
                createdUser = _b.sent();
                console.log(createdUser);
                if (!createdUser)
                    throw new Error('couldnt create the user');
                _id = createdUser._id;
                return [4 /*yield*/, (0, utils_1.generateToken)({ _id: _id })];
            case 5:
                token = _b.sent();
                if (!token.success)
                    throw new Error('Could not create token for user');
                res.status(200).json(token);
                return [2 /*return*/];
        }
    });
}); });
// Passed
// Logging in User
exports.loginController = (0, utils_1.tryCatchWrapper)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var validated, _a, password, username, user, checkPass, _id, userCred, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, User_1.loginSchema.validateAsync(req.body)];
            case 1:
                validated = _b.sent();
                if (!validated)
                    throw new Error('ValidationError');
                _a = req.body, password = _a.password, username = _a.username;
                return [4 /*yield*/, (0, Users_1.getUserByUsername)(username)];
            case 2:
                user = _b.sent();
                console.log('User');
                console.log(user);
                if (!user || !user.password || !user.username) {
                    res.status(400);
                    res.json({
                        success: false,
                        message: 'password or username does not match'
                    });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
            case 3:
                checkPass = _b.sent();
                if (!checkPass)
                    throw new Error('Wrong Password');
                _id = user._id;
                userCred = {
                    _id: _id
                };
                return [4 /*yield*/, (0, utils_1.generateToken)(userCred)];
            case 4:
                token = _b.sent();
                if (!token.success)
                    throw new Error('Could not create token for user');
                res.status(200);
                res.json(token);
                return [2 /*return*/];
        }
    });
}); });
// Working on
// Sending user reset link if forgotter password
exports.forgotPassController = (0, utils_1.tryCatchWrapper)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var validated, username, user, resetSession, resetSessionDb, templateParams;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, User_1.forgotSchema.validateAsync(req.body)];
            case 1:
                validated = _a.sent();
                if (!validated)
                    throw new Error('ValidationError');
                username = req.body.username;
                return [4 /*yield*/, (0, Users_1.getUserByUsername)(username)];
            case 2:
                user = _a.sent();
                console.log('User');
                console.log(user);
                if (!user || !user.password || !user.username) {
                    res.status(400);
                    res.json({
                        success: false,
                        message: 'Username or Email does not exist in users'
                    });
                    return [2 /*return*/];
                }
                resetSession = (0, uuid_1.v4)().substr(1, 7);
                return [4 /*yield*/, (0, Users_1.insertResetToken)(resetSession, user.email, user._id)];
            case 3:
                resetSessionDb = _a.sent();
                if (!resetSessionDb.acknowledged) {
                    res.status(400);
                    res.json({
                        success: false,
                        message: 'Cannot send reset link to email'
                    });
                    return [2 /*return*/];
                }
                templateParams = {
                    email: user.email,
                    reset_token: resetSession
                };
                emailjs_com_1.default.send('service_k08fyfh', 'template_cVxkpJ5b', templateParams, 'user_ttrETVA5PV1DLq0MoMOvh');
                res
                    .status(200)
                    .json({
                    success: true,
                    message: 'Sent reset session successfuly'
                });
                return [2 /*return*/];
        }
    });
}); });
// Passed
// Logging out User
exports.logoutController = (0, utils_1.tryCatchWrapper)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var loggedOut;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, Users_1.updateUser)(req.user._id, { refreshToken: '' })
                // Validating Body
                // const validated = await loginSchema.validateAsync(req.body)
                // if( !validated ) throw new Error('ValidationError')
            ];
            case 1:
                loggedOut = _a.sent();
                // Validating Body
                // const validated = await loginSchema.validateAsync(req.body)
                // if( !validated ) throw new Error('ValidationError')
                if (!loggedOut)
                    throw new Error('failed Logging out user');
                res.status(200);
                res.json({
                    success: true,
                    message: 'User Logged out successfuly'
                });
                return [2 /*return*/];
        }
    });
}); });
// Passed
// Getting User Info For Profile Page
exports.fetchUserInfo = (0, utils_1.tryCatchWrapper)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var UserInfo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, Users_1.getUserInfo)(req.user._id)];
            case 1:
                UserInfo = _a.sent();
                console.log('UserInfo');
                console.log(UserInfo);
                if (!UserInfo) {
                    res.status(400).json({
                        success: false,
                        message: 'Unable to fetch user Info'
                    });
                }
                res.status(200).json({
                    success: true,
                    message: 'User Info Fetched successfuly',
                    userInfo: UserInfo
                });
                return [2 /*return*/];
        }
    });
}); });
// Passed
// Getting User Address For Profile Page
exports.fetchUserAddress = (0, utils_1.tryCatchWrapper)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var UserAddress;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, Users_1.getUserAdd)(req.user._id)];
            case 1:
                UserAddress = _a.sent();
                if (!UserAddress) {
                    res.status(400).json({
                        success: false,
                        message: 'Unable to fetch user Address'
                    });
                }
                res.status(200).json({
                    success: true,
                    message: 'User Address Fetched successfuly',
                    userAddress: UserAddress
                });
                return [2 /*return*/];
        }
    });
}); });
// Passed
// Getting User Orders For Profile Page
exports.fetchUserWishlist = (0, utils_1.tryCatchWrapper)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var UserWishList;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, Users_1.getUserWishlist)(req.user._id)];
            case 1:
                UserWishList = _a.sent();
                if (!UserWishList) {
                    res.status(400).json({
                        success: false,
                        message: 'Unable to fetch user Wish List'
                    });
                }
                res.status(200).json({
                    success: true,
                    message: 'User Wish List fetched successfuly',
                    wishlist: UserWishList
                });
                return [2 /*return*/];
        }
    });
}); });
// Passed
// Getting User Orders For Profile Page
exports.fetchUserOrders = (0, utils_1.tryCatchWrapper)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var UserOrders;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, Users_1.getUserOrders)(req.user._id)];
            case 1:
                UserOrders = _a.sent();
                console.log('UserOrders');
                console.log(UserOrders);
                if (!UserOrders) {
                    res.status(200).json({
                        success: true,
                        message: 'No orders available.'
                    });
                    return [2 /*return*/];
                }
                res.status(200).json({
                    success: true,
                    message: 'User Orders Fetched successfuly',
                    userOrders: UserOrders
                });
                return [2 /*return*/];
        }
    });
}); });
// Working On
// Getting User Orders For Profile Page
exports.createDiscountToken = (0, utils_1.tryCatchWrapper)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, discountToken, disToken;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.params.email;
                if (!email) {
                    res.status(300)
                        .json({
                        success: false,
                        message: 'Email must be included'
                    });
                    return [2 /*return*/];
                }
                discountToken = (0, uuid_1.v4)().substr(1, 7);
                return [4 /*yield*/, (0, Users_1.insertDiscountToken)(discountToken, email)];
            case 1:
                disToken = _a.sent();
                console.log('creating discount token');
                console.log(disToken);
                if (!disToken) {
                    res.status(500).json({
                        success: false,
                        message: 'Could not create discount token.'
                    });
                    return [2 /*return*/];
                }
                if (disToken.code) {
                    res.status(400).json({
                        success: false,
                        message: 'User is already subscribed',
                        code: 21
                    });
                    return [2 /*return*/];
                }
                res.status(200).json({
                    success: true,
                    disToken: discountToken
                });
                return [2 /*return*/];
        }
    });
}); });
// Passed
// Getting a user with id
exports.getUserController = (0, utils_1.tryCatchWrapper)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, user, userOrders, userWithOrders;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _id = req.user._id;
                return [4 /*yield*/, (0, Users_1.getUserInfo)(_id)];
            case 1:
                user = _a.sent();
                if (!user) {
                    res.status(200)
                        .json({
                        success: false,
                        message: 'No User found'
                    });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, Orders_1.findUserOrders)(_id)];
            case 2:
                userOrders = _a.sent();
                userWithOrders = __assign(__assign({}, user), { orders: userOrders });
                res.status(200)
                    .json({
                    success: true,
                    user: userWithOrders
                });
                return [2 /*return*/];
        }
    });
}); });
// Passed
// Updating User
exports.updateUserController = (0, utils_1.tryCatchWrapper)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var validated, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, User_1.updateUserSchema.validateAsync(req.body)];
            case 1:
                validated = _a.sent();
                if (!validated)
                    throw new Error('ValidationError');
                return [4 /*yield*/, (0, Users_1.updateUser)(req.user._id, req.body)];
            case 2:
                user = _a.sent();
                if (!user)
                    throw new Error('Could not update user');
                res.status(200);
                res.json({
                    success: true
                });
                return [2 /*return*/];
        }
    });
}); });
// Passed
// Updating User
exports.updateUserPassController = (0, utils_1.tryCatchWrapper)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var validated, _a, currentPass, newPass, user, checkPass, salt, newPassword, userNewPassword;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, User_1.updateUserPassSchema.validateAsync(req.body)];
            case 1:
                validated = _b.sent();
                if (!validated)
                    throw new Error('ValidationError');
                _a = req.body, currentPass = _a.currentPass, newPass = _a.newPass;
                return [4 /*yield*/, (0, Users_1.getUserPass)(req.user._id)];
            case 2:
                user = _b.sent();
                if (!user) {
                    res.status(400);
                    res.json({
                        success: false,
                        message: 'User not found in database'
                    });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, bcrypt_1.default.compare(currentPass, user.password)];
            case 3:
                checkPass = _b.sent();
                if (!checkPass) {
                    res.status(400);
                    res.json({
                        success: false,
                        message: 'Current password does not match'
                    });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, bcrypt_1.default.genSalt()];
            case 4:
                salt = _b.sent();
                return [4 /*yield*/, bcrypt_1.default.hash(newPass, salt)];
            case 5:
                newPassword = _b.sent();
                return [4 /*yield*/, (0, Users_1.updateUser)(req.user._id, { password: newPassword })];
            case 6:
                userNewPassword = _b.sent();
                if (!userNewPassword) {
                    res.status(500);
                    res.json({
                        success: false,
                        message: 'Password change encountered an error.'
                    });
                    return [2 /*return*/];
                }
                res.status(200);
                res.json({
                    success: true,
                    message: 'Password Changed Successfuly.'
                });
                return [2 /*return*/];
        }
    });
}); });
// Passed
// Check User
exports.checkUserController = (0, utils_1.tryCatchWrapper)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userImg, returnedUser, allFavs;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('user info confirmed');
                return [4 /*yield*/, (0, Users_1.getUserImg)(req.user._id)];
            case 1:
                userImg = _a.sent();
                returnedUser = {
                    _id: req.user._id,
                };
                if (userImg && userImg.img)
                    returnedUser.img = userImg.img;
                return [4 /*yield*/, (0, Users_1.getUserFavorites)(req.user._id)];
            case 2:
                allFavs = _a.sent();
                res.status(200);
                res.json({
                    success: true,
                    userInfo: returnedUser,
                    allFavs: allFavs
                });
                return [2 /*return*/];
        }
    });
}); });
// Passed
// Refreshing user token
exports.refreshUserTokenController = (0, utils_1.tryCatchWrapper)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var refresh_token, decodedToken, _id, user, newTokens;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                refresh_token = req.headers.refresh_token;
                if (!refresh_token.length || typeof refresh_token !== 'string') {
                    res.status(400).json({
                        success: false,
                        message: 'no refresh token'
                    });
                    console.log('no refresh token');
                    return [2 /*return*/];
                }
                decodedToken = jsonwebtoken_1.default.verify(refresh_token, process.env.ACCESS_TOKEN_SECRET || 'secret');
                if (!decodedToken || !decodedToken._id) {
                    res.status(400).json({
                        success: false,
                        message: 'invalid Refresh Token'
                    });
                    console.log('invalid refresh token detected');
                    console.log(decodedToken);
                    return [2 /*return*/];
                }
                _id = decodedToken._id;
                return [4 /*yield*/, (0, Users_1.getUserCred)(_id)];
            case 1:
                user = _a.sent();
                if (!user.refreshToken || user.refreshToken !== refresh_token) {
                    res.status(400).json({
                        success: false,
                        message: 'invalid Refresh Token'
                    });
                    console.log('refresh token doesnt match with user refresh token');
                    return [2 /*return*/];
                }
                return [4 /*yield*/, (0, utils_1.generateToken)({ _id: _id }, true)];
            case 2:
                newTokens = _a.sent();
                res.status(200).json(newTokens);
                return [2 /*return*/];
        }
    });
}); });
// Passed
// Creating contact form
exports.createContactFormController = (0, utils_1.tryCatchWrapper)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var validated, newContactForm;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, User_1.createContactFormSchema.validateAsync(req.body)];
            case 1:
                validated = _a.sent();
                if (!validated)
                    throw new Error('ValidationError');
                return [4 /*yield*/, (0, Users_1.insertContactForm)(req.body)];
            case 2:
                newContactForm = _a.sent();
                if (!newContactForm) {
                    res.status(500)
                        .json({
                        success: false,
                        message: 'Contact form cannot be created'
                    });
                    return [2 /*return*/];
                }
                res.status(200)
                    .json({
                    success: true,
                    message: 'Contact form created successfuly'
                });
                return [2 /*return*/];
        }
    });
}); });
// Passed
// Creating contact form
exports.uploadUserPhotoController = (0, utils_1.tryCatchWrapper)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var photoUrl, userNewImg, updatedUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(req.file);
                photoUrl = req.file.filename;
                console.log('photoUrl');
                console.log(photoUrl);
                userNewImg = {
                    img: photoUrl
                };
                return [4 /*yield*/, (0, Users_1.updateUser)(req.user._id, userNewImg)];
            case 1:
                updatedUser = _a.sent();
                console.log(updatedUser);
                if (!updatedUser) {
                    res.status(400)
                        .json({
                        success: false,
                        message: 'Image upload didnt complete successfuly'
                    });
                    return [2 /*return*/];
                }
                res.status(200)
                    .json({
                    success: true,
                    message: 'image uploaded successfuly',
                    imgUrl: photoUrl
                });
                return [2 /*return*/];
        }
    });
}); });
// Passed
// Creating contact form
exports.removeUserPhotoController = (0, utils_1.tryCatchWrapper)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userNewImg, updatedUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userNewImg = {
                    img: ''
                };
                return [4 /*yield*/, (0, Users_1.updateUser)(req.user._id, userNewImg)];
            case 1:
                updatedUser = _a.sent();
                if (!updatedUser) {
                    res.status(400)
                        .json({
                        success: false,
                        message: 'User image didnt remove successfuly'
                    });
                    return [2 /*return*/];
                }
                res.status(200)
                    .json({
                    success: true,
                    message: 'image removed successfuly',
                });
                return [2 /*return*/];
        }
    });
}); });
