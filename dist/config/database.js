"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelizer = new sequelize_1.Sequelize({
    username: "postgres.jsoydsnldrmdffixeirg",
    password: "shellinfotech123",
    database: "postgres",
    host: "aws-0-ap-southeast-1.pooler.supabase.com",
    dialect: "postgres"
});
exports.default = sequelizer;
