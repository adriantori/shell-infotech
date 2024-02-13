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
// Import necessary modules and functions
const userService_1 = require("../../../services/userService"); // Adjust the import path
const userDao_1 = require("../../../dataAccessObject/userDao"); // Import the entire module
const bcrypt_1 = __importDefault(require("bcrypt"));
// Mock the userDao module and bcrypt module
jest.mock('../../../dataAccessObject/userDao');
jest.mock('bcrypt');
// Example user data for testing
const mockUser = {
    user_id: 1,
    user_email: 'test@example.com',
    user_name: 'testuser',
    user_pass: 'hashedPassword123',
    createdAt: new Date(),
    updatedAt: new Date(),
    is_deleted: 0,
};
describe('updateUserService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should update user successfully when ID exists and password is provided', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock bcrypt.hash to resolve with a hashed password
        bcrypt_1.default.hash.mockResolvedValueOnce('hashedPassword123');
        // Mock the implementation of updateUserDao
        userDao_1.updateUserDao.mockResolvedValueOnce(mockUser);
        // Call the updateUserService function
        const result = yield (0, userService_1.updateUserService)('updatedUser', 'updated@example.com', 'newPassword', 1);
        // Check if updateUserDao was called with the correct arguments
        expect(userDao_1.updateUserDao).toHaveBeenCalledWith('updatedUser', 'updated@example.com', 'hashedPassword123', 1);
        // Check if the result matches the expected user data
        expect(result).toEqual(mockUser);
    }));
    it('should update user successfully when ID exists and password is not provided', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock the implementation of updateUserDao
        userDao_1.updateUserDao.mockResolvedValueOnce(mockUser);
        // Call the updateUserService function without providing a password
        const result = yield (0, userService_1.updateUserService)('updatedUser', 'updated@example.com', undefined, 1);
        // Check if updateUserDao was called with the correct arguments
        expect(userDao_1.updateUserDao).toHaveBeenCalledWith('updatedUser', 'updated@example.com', undefined, 1);
        // Check if the result matches the expected user data
        expect(result).toEqual(mockUser);
    }));
    it('should handle an error from updateUserDao', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock bcrypt.hash to resolve with a hashed password
        bcrypt_1.default.hash.mockResolvedValueOnce('hashedPassword123');
        // Mock updateUserDao to throw an error
        const errorMessage = 'An error occurred in updateUserDao';
        userDao_1.updateUserDao.mockRejectedValueOnce(new Error(errorMessage));
        // Call updateUserService and expect it to throw an error
        yield expect((0, userService_1.updateUserService)('updatedUser', 'updated@example.com', 'newPassword', 1)).rejects.toThrow(errorMessage);
        // Check if updateUserDao was called with the correct arguments
        expect(userDao_1.updateUserDao).toHaveBeenCalledWith('updatedUser', 'updated@example.com', 'hashedPassword123', 1);
    }));
    // Add more test cases as needed
});
