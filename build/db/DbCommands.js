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
exports.CountDocs = exports.deleteMany = exports.deleteOne = exports.updateMany = exports.updateOne = exports.insertMany = exports.insertOne = exports.findMany = exports.findOne = void 0;
var init_1 = require("./init");
var findOne = function (collection, findFilter, opt) { return __awaiter(void 0, void 0, void 0, function () {
    var results, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!init_1.db || !collection.length)
                    throw new Error('Database Not Been initialized');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, init_1.db.collection(collection).findOne(findFilter, opt)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, results];
            case 3:
                err_1 = _a.sent();
                console.log(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.findOne = findOne;
var findMany = function (collection, findFilter, opt, skip, limit, sortField) {
    if (skip === void 0) { skip = 0; }
    if (limit === void 0) { limit = 0; }
    return __awaiter(void 0, void 0, void 0, function () {
        var _a, err_2;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!init_1.db || !collection.length)
                        throw new Error('Database Not Been initialized');
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 6, , 7]);
                    if (!sortField) return [3 /*break*/, 3];
                    return [4 /*yield*/, init_1.db.collection(collection).find(findFilter, opt).sort((_b = {}, _b[sortField] = -1, _b)).skip(skip * limit).limit(limit).toArray()];
                case 2:
                    _a = _c.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, init_1.db.collection(collection).find(findFilter, opt).skip(skip * limit).limit(limit).toArray()];
                case 4:
                    _a = _c.sent();
                    _c.label = 5;
                case 5: 
                // Insert some documents
                return [2 /*return*/, _a];
                case 6:
                    err_2 = _c.sent();
                    console.log(err_2);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
};
exports.findMany = findMany;
var insertOne = function (collection, data, opt) { return __awaiter(void 0, void 0, void 0, function () {
    var dataWithDate, results, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!init_1.db || !collection.length)
                    throw new Error('Database Not Been initialized');
                dataWithDate = __assign(__assign({}, data), { created_at: Date.now() });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, init_1.db.collection(collection).insertOne(dataWithDate, opt)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, results];
            case 3:
                err_3 = _a.sent();
                console.log(err_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.insertOne = insertOne;
var insertMany = function (collection, data) { return __awaiter(void 0, void 0, void 0, function () {
    var dataWithDate, results, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!init_1.db || !collection.length)
                    throw new Error('Database Not Been initialized');
                dataWithDate = __assign(__assign({}, data), { created_at: Date.now() });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, init_1.db.collection(collection).insertMany(dataWithDate)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, results];
            case 3:
                err_4 = _a.sent();
                console.log(err_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.insertMany = insertMany;
var updateOne = function (collection, search, data, opt) { return __awaiter(void 0, void 0, void 0, function () {
    var results, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!init_1.db || !collection.length)
                    throw new Error('Database Not Been initialized');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, init_1.db.collection(collection).updateOne(search, data, opt)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, results];
            case 3:
                err_5 = _a.sent();
                console.log(err_5);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateOne = updateOne;
var updateMany = function (collection, search, data) { return __awaiter(void 0, void 0, void 0, function () {
    var results, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!init_1.db || !collection.length)
                    throw new Error('Database Not Been initialized');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, init_1.db.collection(collection).updateMany(search, data)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, results];
            case 3:
                err_6 = _a.sent();
                console.log(err_6);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateMany = updateMany;
var deleteOne = function (collection, search) { return __awaiter(void 0, void 0, void 0, function () {
    var results, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!init_1.db || !collection.length)
                    throw new Error('Database Not Been initialized');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, init_1.db.collection(collection).deleteOne(search)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, results];
            case 3:
                err_7 = _a.sent();
                console.log(err_7);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteOne = deleteOne;
var deleteMany = function (collection, search) { return __awaiter(void 0, void 0, void 0, function () {
    var results, err_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!init_1.db || !collection.length)
                    throw new Error('Database Not Been initialized');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, init_1.db.collection(collection).deleteMany(search)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, results];
            case 3:
                err_8 = _a.sent();
                console.log(err_8);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteMany = deleteMany;
var CountDocs = function (collection, countFilter, opt) { return __awaiter(void 0, void 0, void 0, function () {
    var results, err_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!init_1.db || !collection.length)
                    throw new Error('Database Not Been initialized');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, init_1.db.collection(collection).countDocuments(countFilter, opt)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, results];
            case 3:
                err_9 = _a.sent();
                console.log(err_9);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.CountDocs = CountDocs;
