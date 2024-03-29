"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.undeleteUserService = exports.deleteUserService = exports.updateUserService = exports.getUserService = exports.getAllUserService = exports.createUserService = void 0;
const bcrypt = __importStar(require("bcrypt"));
const memory_cache_1 = __importDefault(require("memory-cache"));
const userDao_1 = require("../dataAccessObject/userDao");
function createUserService(username, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const hashedPassword = yield bcrypt.hash(password, 10);
            const user = yield (0, userDao_1.createUserDao)(username, email, hashedPassword);
            return user;
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
exports.createUserService = createUserService;
function getAllUserService(useCache = true) {
    return __awaiter(this, void 0, void 0, function* () {
        const CACHE_KEY = 'allUsers';
        try {
            if (useCache) {
                const cachedUsers = memory_cache_1.default.get(CACHE_KEY);
                if (cachedUsers) {
                    console.log('Returning cached users');
                    return cachedUsers;
                }
            }
            const users = yield (0, userDao_1.getAllUserDao)();
            // Cache the result for future calls
            memory_cache_1.default.put(CACHE_KEY, users, 60000); // Cache for 1 minute
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
            let hashedPassword;
            if (typeof password === 'string') {
                // Hash the password if it is provided
                hashedPassword = yield bcrypt.hash(password, 10);
            }
            const user = yield (0, userDao_1.updateUserDao)(username, email, hashedPassword, userId);
            return user;
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
exports.updateUserService = updateUserService;
function deleteUserService(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, userDao_1.deleteUserDao)(userId);
            return user;
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
exports.deleteUserService = deleteUserService;
function undeleteUserService(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield (0, userDao_1.undeleteUserDao)(userId);
            return user;
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
exports.undeleteUserService = undeleteUserService;
