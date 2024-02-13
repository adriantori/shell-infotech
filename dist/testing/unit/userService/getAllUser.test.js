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
// getAllUser.test.ts
const userModel_1 = __importDefault(require("../../../models/userModel"));
const userService_1 = require("../../../services/userService"); // Adjust the import path
jest.mock('../../../models/userModel');
const mockUsers = [
    {
        user_id: 1,
        user_email: 'user1@example.com',
        user_name: 'user1',
        user_pass: 'password1',
        createdAt: new Date(),
        updatedAt: new Date(),
        is_deleted: 0,
    },
    {
        user_id: 2,
        user_email: 'user2@example.com',
        user_name: 'user2',
        user_pass: 'password2',
        createdAt: new Date(),
        updatedAt: new Date(),
        is_deleted: 0,
    },
];
describe('getAllUserService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should return all users successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock the implementation of User.findAll
        userModel_1.default.findAll.mockResolvedValueOnce(mockUsers); // Replace mockUsers with your test data
        const result = yield (0, userService_1.getAllUserService)();
        expect(userModel_1.default.findAll).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockUsers);
    }));
    it('should handle an error from getAllUserDao', () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = 'An error occurred in getAllUserDao';
        userModel_1.default.findAll.mockRejectedValueOnce(new Error(errorMessage));
        yield expect((0, userService_1.getAllUserService)()).rejects.toThrow(errorMessage);
        expect(userModel_1.default.findAll).toHaveBeenCalledTimes(1);
    }));
    // Add a test case for handling an error from User.findAll if needed
});
