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
const userController_1 = require("../../../controllers/userController"); // Update this with your actual controller path
const userService = __importStar(require("../../../services/userService")); // Update this with your actual service path
describe('getUserByIdController', () => {
    const mockRequest = {
        params: {
            id: '1', // Assuming the user ID is '1' for testing
        },
    };
    const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should retrieve user successfully when user exists', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUser = [{ /* mocked user data */}];
        const spyOnGetUserService = jest.spyOn(userService, 'getUserService').mockResolvedValueOnce(mockUser);
        yield (0, userController_1.getUserByIdController)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'User retrieved successfully',
            data: mockUser,
        });
        // Restore the original function after the test
        spyOnGetUserService.mockRestore();
    }));
    it('should handle case when user does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        const spyOnGetUserService = jest.spyOn(userService, 'getUserService').mockResolvedValueOnce([]);
        yield (0, userController_1.getUserByIdController)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'User does not exist',
        });
        // Restore the original function after the test
        spyOnGetUserService.mockRestore();
    }));
    it('should handle internal server error', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockError = new Error('Internal Server Error');
        const spyOnGetUserService = jest.spyOn(userService, 'getUserService').mockRejectedValueOnce(mockError);
        yield (0, userController_1.getUserByIdController)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'Internal Server Error',
        });
        // Restore the original function after the test
        spyOnGetUserService.mockRestore();
    }));
});
