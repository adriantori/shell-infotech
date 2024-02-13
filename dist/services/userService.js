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
exports.updateUserService = exports.getUserService = exports.getAllUserService = exports.createUserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userDao_1 = require("../dataAccessObject/userDao");
function createUserService(username, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const user = yield (0, userDao_1.createUserDao)(username, email, hashedPassword);
            return user;
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
exports.createUserService = createUserService;
function getAllUserService() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield (0, userDao_1.getAllUserDao)();
            return users;
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
exports.getAllUserService = getAllUserService;
function getUserService(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, userDao_1.getUserDao)(userId);
            return user;
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
exports.getUserService = getUserService;
function updateUserService(username, email, password, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const user = yield (0, userDao_1.updateUserDao)(username, email, hashedPassword, userId);
            return user;
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
exports.updateUserService = updateUserService;
