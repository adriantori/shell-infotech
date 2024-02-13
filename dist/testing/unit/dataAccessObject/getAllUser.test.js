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
// getAllUserDao.test.ts
const sequelize_1 = require("sequelize");
const userModel_1 = __importDefault(require("../../../models/userModel"));
const userDao_1 = require("../../../dataAccessObject/userDao");
// Mock the User model
jest.mock('../../../models/userModel');
// Define a mock model class to ensure correct typing
class MockUser extends sequelize_1.Model {
}
describe('getAllUserDao', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should retrieve all users successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock the successful retrieval of users
        const mockUsers = [
            {
                user_id: 1,
                user_name: 'user1',
                user_email: 'user1@example.com',
                user_pass: 'password1',
                createdAt: new Date(),
                updatedAt: new Date(),
                is_deleted: 0,
            },
            {
                user_id: 2,
                user_name: 'user2',
                user_email: 'user2@example.com',
                user_pass: 'password2',
                createdAt: new Date(),
                updatedAt: new Date(),
                is_deleted: 0,
            },
        ];
        jest.spyOn(userModel_1.default, 'findAll').mockResolvedValueOnce(mockUsers);
        const result = yield (0, userDao_1.getAllUserDao)();
        expect(userModel_1.default.findAll).toHaveBeenCalledWith({
            where: {
                is_deleted: 0,
            },
            order: [
                ['user_id', 'ASC'],
            ],
        });
        expect(result).toEqual(mockUsers);
    }));
    it('should handle validation error', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock the retrieval of users with validation error
        const validationError = new Error('Validation error: Some validation error message');
        jest.spyOn(userModel_1.default, 'findAll').mockRejectedValueOnce(validationError);
        yield expect((0, userDao_1.getAllUserDao)()).rejects.toThrow('Some validation error message');
        expect(userModel_1.default.findAll).toHaveBeenCalledWith({
            where: {
                is_deleted: 0,
            },
            order: [
                ['user_id', 'ASC'],
            ],
        });
    }));
    // Add more test cases as needed
});
