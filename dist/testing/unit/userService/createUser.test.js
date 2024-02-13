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
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = __importStar(require("bcrypt"));
const userService_1 = require("../../../services/userService");
const userDao_1 = require("../../../dataAccessObject/userDao");
jest.mock('bcrypt');
jest.mock('../../../dataAccessObject/userDao');
const mockCreateUserDao = userDao_1.createUserDao;
const mockUser = { user_id: 1, user_email: 'test@example.com', user_name: 'testuser', is_deleted: 0 };
describe('createUserService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should create user successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock createUserDao
        mockCreateUserDao.mockResolvedValueOnce(mockUser);
        // Mock bcrypt.hash to resolve immediately with a hashed password
        bcrypt.hash.mockResolvedValueOnce('hashedPassword');
        const result = yield (0, userService_1.createUserService)('testuser', 'test@example.com', 'password123');
        expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
        expect(mockCreateUserDao).toHaveBeenCalledWith('testuser', 'test@example.com', 'hashedPassword');
        expect(result).toEqual(mockUser);
    }));
    it('should handle an error from createUserDao', () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = 'An error occurred in createUserDao';
        mockCreateUserDao.mockRejectedValueOnce(new Error(errorMessage));
        // Mock bcrypt.hash to resolve immediately with a hashed password
        bcrypt.hash.mockResolvedValueOnce('hashedPassword');
        yield expect((0, userService_1.createUserService)('testuser', 'test@example.com', 'password123')).rejects.toThrow(errorMessage);
        expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
        expect(mockCreateUserDao).toHaveBeenCalledWith('testuser', 'test@example.com', 'hashedPassword');
    }));
    // Add more test cases as needed
});
