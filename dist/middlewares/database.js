"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = exports.attachDB = void 0;
const sequelize_1 = require("sequelize");
const constants_1 = require("../config/constants");
// Construct the database URI
const dbUri = constants_1.POSTGRES_URI || 'postgresql://user:password@localhost:5432/your_database';
// Create Sequelize instance using the URI and options
const sequelize = new sequelize_1.Sequelize(dbUri, {
    dialect: 'postgres',
    dialectModule: require('pg')
});
exports.sequelize = sequelize;
// Middleware function to attach the Sequelize instance to the request object
const attachDB = (req, res, next) => {
    req.sequelize = sequelize;
    next();
};
exports.attachDB = attachDB;
