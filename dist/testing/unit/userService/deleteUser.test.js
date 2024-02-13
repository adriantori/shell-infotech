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
// Import necessary modules and functions
const userService_1 = require("../../../services/userService"); // Adjust the import path
const userDao_1 = require("../../../dataAccessObject/userDao"); // Import the entire module
// Mock the userDao module
jest.mock('../../../dataAccessObject/userDao');
// Example user data for testing
const mockUser = {
    user_id: 1,
    user_email: 'test@example.com',
    user_name: 'testuser',
    user_pass: 'hashedPassword123',
    createdAt: new Date(),
    updatedAt: new Date(),
    is_deleted: 1,
};
describe('deleteUserService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should delete user successfully when ID exists', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock the implementation of deleteUserDao
        userDao_1.deleteUserDao.mockResolvedValueOnce(mockUser);
        // Call the deleteUserService function
        const result = yield (0, userService_1.deleteUserService)(1);
        // Check if deleteUserDao was called with the correct argument
        expect(userDao_1.deleteUserDao).toHaveBeenCalledWith(1);
        // Check if the result matches the expected user data
        expect(result).toEqual(mockUser);
    }));
    it('should handle an error from deleteUserDao', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock deleteUserDao to throw an error
        const errorMessage = 'An error occurred in deleteUserDao';
        userDao_1.deleteUserDao.mockRejectedValueOnce(new Error(errorMessage));
        // Call deleteUserService and expect it to throw an error
        yield expect((0, userService_1.deleteUserService)(1)).rejects.toThrow(errorMessage);
        // Check if deleteUserDao was called with the correct argument
        expect(userDao_1.deleteUserDao).toHaveBeenCalledWith(1);
    }));
    // Add more test cases as needed
});
