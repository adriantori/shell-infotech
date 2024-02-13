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
// Import necessary modules and functions
const userService_1 = require("../../../services/userService"); // Adjust the import path
const userDaoModule = __importStar(require("../../../dataAccessObject/userDao")); // Import the entire module
// Mock the userDao module
jest.mock('../../../dataAccessObject/userDao');
const { getUserDao } = userDaoModule; // Destructure the function from the module
// Example user data for testing
const mockUser = { user_id: 1, user_email: 'test@example.com', user_name: 'testuser', is_deleted: 0 };
describe('getUserService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should get user successfully when ID exists', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock the implementation of getUserDao
        getUserDao.mockResolvedValueOnce(mockUser);
        const result = yield (0, userService_1.getUserService)(1);
        expect(getUserDao).toHaveBeenCalledWith(1);
        expect(result).toEqual(mockUser);
    }));
    it('should handle an error from getUserDao', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock getUserDao to throw an error
        const errorMessage = 'An error occurred in getUserDao';
        getUserDao.mockRejectedValueOnce(new Error(errorMessage));
        yield expect((0, userService_1.getUserService)(1)).rejects.toThrow(errorMessage);
        expect(getUserDao).toHaveBeenCalledWith(1);
    }));
    // Add more test cases as needed
});
