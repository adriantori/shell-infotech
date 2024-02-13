"use strict";
// dist/testing/unit/userService/undeleteUser.test.js
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
const mockUser = { user_id: 1, user_email: 'test@example.com', user_name: 'testuser', is_deleted: 0 };
describe('undeleteUserService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should undelete user successfully when ID exists', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock the implementation of undeleteUserDao
        userDao_1.undeleteUserDao.mockResolvedValueOnce(mockUser);
        const result = yield (0, userService_1.undeleteUserService)(1);
        expect(userDao_1.undeleteUserDao).toHaveBeenCalledWith(1);
        expect(result).toEqual(mockUser);
    }));
    it('should handle an error from undeleteUserDao', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock undeleteUserDao to throw an error
        const errorMessage = 'An error occurred in undeleteUserDao';
        userDao_1.undeleteUserDao.mockRejectedValueOnce(new Error(errorMessage));
        yield expect((0, userService_1.undeleteUserService)(1)).rejects.toThrow(errorMessage);
        expect(userDao_1.undeleteUserDao).toHaveBeenCalledWith(1);
    }));
    // Add more test cases as needed
});
