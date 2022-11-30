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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryCatchWrapper = exports.validateToken = exports.generateToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var Users_1 = require("../Models/Users");
var generateToken = function (userCred, refreshed) {
    if (refreshed === void 0) { refreshed = false; }
    return __awaiter(void 0, void 0, void 0, function () {
        var rToken, ok, accessToken;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    rToken = jsonwebtoken_1.default.sign(userCred, process.env.REFRESH_TOKEN_SECRET || 'secret', {
                        expiresIn: refreshed ? "4d" : "2d",
                    });
                    return [4 /*yield*/, (0, Users_1.updateUser)(userCred._id, { refreshToken: rToken })];
                case 1:
                    ok = _a.sent();
                    accessToken = jsonwebtoken_1.default.sign(userCred, process.env.ACCESS_TOKEN_SECRET || 'secret', { expiresIn: refreshed ? "2d" : "15min" });
                    if (!ok) {
                        return [2 /*return*/, { success: false }];
                    }
                    return [2 /*return*/, { success: true, access_token: accessToken, refresh_token: rToken }];
            }
        });
    });
};
exports.generateToken = generateToken;
var validateToken = function (_id, refreshToken) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, Users_1.getUserCred)(_id)];
            case 1:
                user = _a.sent();
                console.log('in validateToken function in utils');
                console.log(user);
                console.log(refreshToken);
                if (user.refreshToken !== refreshToken)
                    return [2 /*return*/, false];
                return [2 /*return*/, true];
        }
    });
}); };
exports.validateToken = validateToken;
var tryCatchWrapper = function (cb) { return function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, cb(req, res, next)];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.log(err_1.message);
                console.log(err_1.name);
                determinStatusCode(res, err_1);
                next(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); }; };
exports.tryCatchWrapper = tryCatchWrapper;
var determinStatusCode = function (res, err) {
    if (err.name === 'ValidationError') {
        res.status(422);
    }
    else if (err.name === "TokenExpiredError") {
        console.log("token expired statement");
        res.status(300).json({
            success: false,
            message: "Access token expired.",
            code: 4
        });
        return;
    }
    else if (err.expiredAt) {
        console.log("token expired statement");
        res.status(300).json({
            success: false,
            message: "Access token expired.",
            code: 4
        });
        return;
    }
    else if (err.message === 'Wrong Password') {
        console.log("wrong pass");
        res.status(400).json({
            success: false,
            message: "Wrong password.",
        });
        return;
    }
    else {
        res.status(500);
    }
};
