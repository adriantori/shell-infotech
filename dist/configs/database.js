"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelizer = new sequelize_1.Sequelize({
    dialect: 'postgres',
    host: 'your-database-host',
    port: 5432,
    username: 'your-database-username',
    password: 'your-database-password',
    database: 'your-database-name',
});
exports.default = sequelizer;
