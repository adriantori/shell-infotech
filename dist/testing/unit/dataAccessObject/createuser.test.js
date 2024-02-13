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
// createUserDao.test.ts
const userModel_1 = __importDefault(require("../../../models/userModel"));
const userDao_1 = require("../../../dataAccessObject/userDao");
// Mock the User model
jest.mock('../../../models/userModel');
describe('createUserDao', () => {
    const mockCreate = jest.fn();
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should create a user successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock the successful creation of a user
        jest.spyOn(userModel_1.default, 'create').mockResolvedValueOnce({
            user_id: 1,
            user_name: 'testUser',
            user_email: 'test@example.com',
            user_pass: 'password123',
            createdAt: new Date(),
            updatedAt: new Date(),
            is_deleted: 0,
        });
        const username = 'testUser';
        const email = 'test@example.com';
        const password = 'password123';
        const result = yield (0, userDao_1.createUserDao)(username, email, password);
        expect(userModel_1.default.create).toHaveBeenCalledWith({
            user_name: username,
            user_email: email,
            user_pass: password,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
            is_deleted: 0,
        });
        expect(result).toEqual({
            user_id: 1,
            user_name: 'testUser',
            user_email: 'test@example.com',
            user_pass: 'password123',
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
            is_deleted: 0,
        });
    }));
    it('should handle validation error', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock the creation of a user with validation error
        const validationError = new Error('Validation error: Some validation error message');
        jest.spyOn(userModel_1.default, 'create').mockRejectedValueOnce(validationError);
        const username = 'testUser';
        const email = 'test@example.com';
        const password = 'password123';
        yield expect((0, userDao_1.createUserDao)(username, email, password)).rejects.toThrow('Some validation error message');
        expect(userModel_1.default.create).toHaveBeenCalledWith({
            user_name: username,
            user_email: email,
            user_pass: password,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
            is_deleted: 0,
        });
    }));
    // Add more test cases as needed
});
