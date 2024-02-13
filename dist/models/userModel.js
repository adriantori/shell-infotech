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
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../middlewares/database");
class User extends sequelize_1.Model {
    // Define a custom validation method
    validateUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield User.findOne({ where: { user_name: username } });
            if (existingUser) {
                return 'This username is already taken';
            }
        });
    }
}
User.init({
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    user_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isUnique: function (username) {
                return __awaiter(this, void 0, void 0, function* () {
                    const validationError = yield this.validateUsername(username);
                    if (validationError) {
                        throw new Error(validationError);
                    }
                });
            },
        },
    },
    user_pass: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true, // You can set allowNull based on your requirements
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true, // You can set allowNull based on your requirements
    },
}, {
    sequelize: database_1.sequelize,
    modelName: 'User',
    tableName: 'Users',
    timestamps: false,
});
exports.default = User;
