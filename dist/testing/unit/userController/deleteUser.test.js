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
const userController_1 = require("../../../controllers/userController"); // Update this with your actual controller path
const userService_1 = require("../../../services/userService"); // Update this with your actual service path
// Mock the service
jest.mock('../../../services/userService'); // Update this with your actual service path
describe('deleteUserController', () => {
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
    it('should delete user successfully when ID exists', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock the deleteUserService to return a user
        userService_1.deleteUserService.mockResolvedValueOnce({ /* mocked user data */});
        yield (0, userController_1.deleteUserController)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'Delete User success',
        });
    }));
    it('should handle case when ID does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock the deleteUserService to return null
        userService_1.deleteUserService.mockResolvedValueOnce(null);
        yield (0, userController_1.deleteUserController)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'ID does not exist',
        });
    }));
    it('should handle internal server error', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock the deleteUserService to throw an error
        userService_1.deleteUserService.mockRejectedValueOnce(new Error('Internal Server Error'));
        yield (0, userController_1.deleteUserController)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'Internal Server Error',
        });
    }));
});
