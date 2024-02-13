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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.undeleteUserDao = exports.deleteUserDao = exports.updateUserDao = exports.getUserDao = exports.getAllUserDao = exports.createUserDao = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
function createUserDao(username, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const currentDate = new Date();
        try {
            const user = yield userModel_1.default.create({
                user_name: username,
                user_email: email,
                user_pass: password,
                createdAt: currentDate,
                updatedAt: currentDate,
                is_deleted: 0
            });
            return user;
        }
        catch (error) {
            throw new Error(error.message.replace('Validation error: ', ''));
        }
    });
}
exports.createUserDao = createUserDao;
function getAllUserDao() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield userModel_1.default.findAll({
                where: {
                    is_deleted: 0
                },
                order: [
                    ['user_id', 'ASC']
                ]
            });
            return users;
        }
        catch (error) {
            throw new Error(error.message.replace('Validation error: ', ''));
        }
    });
}
exports.getAllUserDao = getAllUserDao;
function getUserDao(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield userModel_1.default.findAll({
                where: {
                    is_deleted: 0,
                    user_id: userId
                }
            });
            return user;
        }
        catch (error) {
            throw new Error(error.message.replace('Validation error: ', ''));
        }
    });
}
exports.getUserDao = getUserDao;
function updateUserDao(username, email, password, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const currentDate = new Date();
        try {
            const result = yield userModel_1.default.update({
                user_name: username,
                user_email: email,
                user_pass: password,
                updatedAt: currentDate,
            }, {
                where: {
                    is_deleted: 0,
                    user_id: userId,
                },
                returning: true,
            });
            if (result && Array.isArray(result) && result.length > 1 && result[1].length > 0) {
                const user = result[1][0];
                return user;
            }
            else {
                throw new Error('No user updated');
            }
        }
        catch (error) {
            throw new Error(error.message.replace('Validation error: ', ''));
        }
    });
}
exports.updateUserDao = updateUserDao;
function deleteUserDao(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const currentDate = new Date();
        try {
            const user = yield userModel_1.default.update({
                is_deleted: 1,
                updatedAt: currentDate,
            }, {
                where: {
                    user_id: userId
                }
            });
            return user;
        }
        catch (error) {
            throw new Error(error.message.replace('Validation error: ', ''));
        }
    });
}
exports.deleteUserDao = deleteUserDao;
function undeleteUserDao(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const currentDate = new Date();
        try {
            const user = yield userModel_1.default.update({
                is_deleted: 0,
                updatedAt: currentDate,
            }, {
                where: {
                    user_id: userId
                }
            });
            return user;
        }
        catch (error) {
            throw new Error(error.message.replace('Validation error: ', ''));
        }
    });
}
exports.undeleteUserDao = undeleteUserDao;
