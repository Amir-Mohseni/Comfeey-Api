"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initMongoDB = exports.db = void 0;
var mongodb_1 = require("mongodb");
exports.db = null;
var initMongoDB = function () {
    console.log('Initializing MongoDB');
    var client = new mongodb_1.MongoClient(process.env.DBURL, { useUnifiedTopology: true });
    client.connect(function (err, client) {
        if (err)
            throw err;
        exports.db = client.db('Comfeey');
        exports.db.collection('products').find().toArray(function (err, result) {
            if (err)
                throw err;
            console.log('MongoDB Client Initialized Successfuly');
        });
    });
};
exports.initMongoDB = initMongoDB;
