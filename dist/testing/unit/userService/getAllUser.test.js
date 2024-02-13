"use strict";
// dist/testing/unit/userService/getAllUser.test.js
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
const userService_1 = require("../../../services/userService");
const userDao_1 = require("../../../dataAccessObject/userDao");
// Mock the userDao module
jest.mock('../../../dataAccessObject/userDao');
// Example user data for testing
const mockUsers = [
    { user_id: 1, user_email: 'test1@example.com', user_name: 'testuser1', is_deleted: 0 },
    { user_id: 2, user_email: 'test2@example.com', user_name: 'testuser2', is_deleted: 0 },
    // Add more mock data as needed
];
describe('getAllUserService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should return all users successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock the implementation of getAllUserDao
        userDao_1.getAllUserDao.mockResolvedValueOnce(mockUsers);
        const result = yield (0, userService_1.getAllUserService)();
        expect(userDao_1.getAllUserDao).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockUsers);
    }));
    it('should handle an error from getAllUserDao', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock getAllUserDao to throw an error
        const errorMessage = 'An error occurred in getAllUserDao';
        userDao_1.getAllUserDao.mockRejectedValueOnce(new Error(errorMessage));
        yield expect((0, userService_1.getAllUserService)()).rejects.toThrow(errorMessage);
        expect(userDao_1.getAllUserDao).toHaveBeenCalledTimes(1);
    }));
    // Add more test cases as needed
});
