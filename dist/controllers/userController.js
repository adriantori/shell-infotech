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
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUser = exports.createUser = void 0;
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('create');
    });
}
exports.createUser = createUser;
function getAllUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('get all');
    });
}
exports.getAllUser = getAllUser;
function getUserById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('get id');
    });
}
exports.getUserById = getUserById;
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('update');
    });
}
exports.updateUser = updateUser;
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('delete');
    });
}
exports.deleteUser = deleteUser;
