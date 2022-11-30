"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
if (process.env.mode !== 'production') {
    dotenv_1.default.config();
}
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var helmet_1 = __importDefault(require("helmet"));
var morgan_1 = __importDefault(require("morgan"));
var db_1 = require("./db");
var ErrorHandlers_1 = require("./Middlewares/ErrorHandlers");
// Routes
var Product_1 = __importDefault(require("./Routes/Product"));
var User_1 = __importDefault(require("./Routes/User"));
var Review_1 = __importDefault(require("./Routes/Review"));
var Order_1 = __importDefault(require("./Routes/Order"));
var Category_1 = __importDefault(require("./Routes/Category"));
var SubCategory_1 = __importDefault(require("./Routes/SubCategory"));
var app = (0, express_1.default)();
(0, db_1.initMongoDB)();
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('common'));
app.use(express_1.default.json());
app.use(express_1.default.static("static"));
app.get('/', function (req, res) {
    console.log(req.originalUrl);
    res.send('hello World');
});
app.use('/api', Product_1.default);
app.use('/api', User_1.default);
app.use('/api', Review_1.default);
app.use('/api', Order_1.default);
app.use('/api', Category_1.default);
app.use('/api', SubCategory_1.default);
app.use(ErrorHandlers_1.errorMiddleWare);
app.use(ErrorHandlers_1.errorHandler);
var port = process.env.PORT || 3000;
console.log(process.env.PORT);
app.listen(port, function () {
    console.log("Listening on port " + port);
});
