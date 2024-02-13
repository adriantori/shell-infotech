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
// updateUserDao.test.ts
const sequelize_1 = require("sequelize");
const userModel_1 = __importDefault(require("../../../models/userModel"));
const userDao_1 = require("../../../dataAccessObject/userDao");
// Mock the User model
jest.mock('../../../models/userModel');
// Define a mock model class to ensure correct typing
class MockUser extends sequelize_1.Model {
}
describe('updateUserDao', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should update user successfully when ID exists', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock the successful update of user
        const mockUpdatedUser = {
            user_id: 1,
            user_name: 'updatedUser',
            user_email: 'updated@example.com',
            user_pass: 'updatedPassword',
            createdAt: new Date(),
            updatedAt: new Date(),
            is_deleted: 0,
        };
        // Use a direct mock without spyOn and mockImplementation
        userModel_1.default.update = jest.fn().mockResolvedValueOnce([1, [mockUpdatedUser]]);
        const result = yield (0, userDao_1.updateUserDao)('updatedUser', 'updated@example.com', 'updatedPassword', 1);
        expect(userModel_1.default.update).toHaveBeenCalledWith({
            user_name: 'updatedUser',
            user_email: 'updated@example.com',
            user_pass: 'updatedPassword',
            updatedAt: expect.any(Date),
        }, {
            where: {
                is_deleted: 0,
                user_id: 1,
            },
            returning: true,
        });
        expect(result).toEqual(mockUpdatedUser);
    }));
    it('should handle validation error', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock the update of user with validation error
        const validationError = new Error('Validation error: Some validation error message');
        userModel_1.default.update = jest.fn().mockRejectedValueOnce(validationError);
        yield expect((0, userDao_1.updateUserDao)('updatedUser', 'updated@example.com', 'updatedPassword', 1)).rejects.toThrow('Some validation error message');
        expect(userModel_1.default.update).toHaveBeenCalledWith({
            user_name: 'updatedUser',
            user_email: 'updated@example.com',
            user_pass: 'updatedPassword',
            updatedAt: expect.any(Date),
        }, {
            where: {
                is_deleted: 0,
                user_id: 1,
            },
            returning: true,
        });
    }));
    it('should handle case when ID does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock the update of user when ID does not exist
        userModel_1.default.update = jest.fn().mockResolvedValueOnce([0, []]);
        yield expect((0, userDao_1.updateUserDao)('updatedUser', 'updated@example.com', 'updatedPassword', 1)).rejects.toThrow('No user updated');
        expect(userModel_1.default.update).toHaveBeenCalledWith({
            user_name: 'updatedUser',
            user_email: 'updated@example.com',
            user_pass: 'updatedPassword',
            updatedAt: expect.any(Date),
        }, {
            where: {
                is_deleted: 0,
                user_id: 1,
            },
            returning: true,
        });
    }));
    // Add more test cases as needed
});
