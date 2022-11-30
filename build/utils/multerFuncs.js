"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadForUserPhoto = void 0;
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
var storageForUserPhoto = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./static/profile/");
    },
    filename: function (req, file, cb) {
        cb(null, req.user._id +
            Date.now() +
            path_1.default.extname(file.originalname));
    },
});
exports.uploadForUserPhoto = (0, multer_1.default)({
    storage: storageForUserPhoto,
    limits: { fileSize: 10000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
});
// Check File Type
function checkFileType(file, cb) {
    try {
        // Allowed ext
        var filetypes = /jpeg|jpg|png/;
        // Check ext
        var extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
        // Check mime
        var mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        }
        else {
            throw new Error("Only image Files with size less than 10MB.");
        }
    }
    catch (err) {
        console.log(err.message);
        return cb(null, true);
    }
}
