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
// createUserService.test.ts
const bcrypt_1 = __importDefault(require("bcrypt"));
const userService_1 = require("../../../services/userService");
const userDao = __importStar(require("../../../dataAccessObject/userDao")); // Import the entire module
// Mock the data access object module
jest.mock('../../../dataAccessObject/userDao');
describe('createUserService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should create user successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const username = 'testUser';
        const email = 'test@example.com';
        const password = 'password123';
        // Mock the bcrypt hash function using spyOn
        const bcryptSpy = jest.spyOn(bcrypt_1.default, 'hash');
        bcryptSpy.mockResolvedValue('hashedPassword123');
        // Mock the createUserDao function from the userDao module
        const createUserDaoSpy = jest.spyOn(userDao, 'createUserDao').mockResolvedValue({
            user_id: 1,
            user_name: username,
            user_email: email,
            user_pass: 'hashedPassword123',
            createdAt: new Date(),
            updatedAt: new Date(),
            is_deleted: 0,
        });
        const result = yield (0, userService_1.createUserService)(username, email, password);
        expect(bcryptSpy).toHaveBeenCalledWith(password, 10);
        expect(createUserDaoSpy).toHaveBeenCalledWith(username, email, 'hashedPassword123');
        // Adjust the expected result based on your actual return value from createUserDao
        expect(result).toEqual({
            user_id: 1,
            user_name: username,
            user_email: email,
            user_pass: 'hashedPassword123',
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
            is_deleted: 0,
        });
    }));
    it('should handle error during user creation', () => __awaiter(void 0, void 0, void 0, function* () {
        const username = 'testUser';
        const email = 'test@example.com';
        const password = 'password123';
        // Mock the bcrypt hash function using spyOn
        const bcryptSpy = jest.spyOn(bcrypt_1.default, 'hash');
        bcryptSpy.mockResolvedValue('hashedPassword123');
        // Mock the createUserDao function from the userDao module
        jest.spyOn(userDao, 'createUserDao').mockRejectedValueOnce(new Error('Some error during user creation'));
        yield expect((0, userService_1.createUserService)(username, email, password)).rejects.toThrow('Some error during user creation');
    }));
    // Add more test cases as needed
});
