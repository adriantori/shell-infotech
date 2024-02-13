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
exports.deleteUserController = exports.updateUserController = exports.getUserByIdController = exports.getAllUserController = exports.createUserController = void 0;
const userService_1 = require("../services/userService");
function createUserController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, email, password } = req.body;
        try {
            const user = yield (0, userService_1.createUserService)(username, email, password);
            if (user) {
                res.status(201).json({
                    message: 'Create User success',
                    data: user,
                });
            }
            else {
                res.status(409).json({
                    message: 'Username already exist',
                    data: user,
                });
            }
        }
        catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    });
}
exports.createUserController = createUserController;
function getAllUserController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield (0, userService_1.getAllUserService)();
            res.status(200).json({
                message: 'Users retrieved successfully',
                data: users,
            });
        }
        catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    });
}
exports.getAllUserController = getAllUserController;
function getUserByIdController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.params.id;
        try {
            const user = yield (0, userService_1.getUserService)(parseInt(userId));
            console.log(user.length);
            if (user.length > 0) {
                res.status(200).json({
                    message: 'User retrieved successfully',
                    data: user,
                });
            }
            else {
                res.status(200).json({
                    message: 'User does not exist'
                });
            }
            ;
        }
        catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    });
}
exports.getUserByIdController = getUserByIdController;
function updateUserController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, email, password } = req.body;
        const userId = parseInt(req.params.id);
        try {
            const user = yield (0, userService_1.updateUserService)(username, email, password, userId);
            if (user) {
                res.status(200).json({
                    message: 'Update User success'
                });
            }
            else {
                res.status(200).json({
                    message: 'ID does not exist'
                });
            }
        }
        catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    });
}
exports.updateUserController = updateUserController;
function deleteUserController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send(`delete ${req.params.id}`);
    });
}
exports.deleteUserController = deleteUserController;
