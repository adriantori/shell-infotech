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
const userService_1 = require("../../../services/userService");
const userDao_1 = require("../../../dataAccessObject/userDao");
jest.mock('../../../dataAccessObject/userDao');
const mockUsers = [
    { user_id: 1, user_email: 'test1@example.com', user_name: 'testuser1', is_deleted: 0 },
    { user_id: 2, user_email: 'test2@example.com', user_name: 'testuser2', is_deleted: 0 },
];
describe('getAllUserService', () => {
    let mockedGetAllUserDao;
    beforeEach(() => {
        mockedGetAllUserDao = userDao_1.getAllUserDao;
        jest.useFakeTimers();
    });
    afterEach(() => {
        jest.clearAllMocks();
        jest.runAllTimers(); // Ensure all timers are executed
        jest.useRealTimers();
    });
    it('should return all users successfully from cache when useCache is true', () => __awaiter(void 0, void 0, void 0, function* () {
        mockedGetAllUserDao.mockResolvedValueOnce(mockUsers);
        yield (0, userService_1.getAllUserService)();
        const result = yield (0, userService_1.getAllUserService)();
        expect(mockedGetAllUserDao).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockUsers);
    }));
    it('should not use cache after its expiration', () => __awaiter(void 0, void 0, void 0, function* () {
        mockedGetAllUserDao.mockResolvedValueOnce(mockUsers);
        yield (0, userService_1.getAllUserService)();
        jest.advanceTimersByTime(60001); // Expire the cache (1 minute + 1 ms)
        yield (0, userService_1.getAllUserService)(); // This should fetch fresh data
        expect(mockedGetAllUserDao).toHaveBeenCalledTimes(2);
    }));
    it('should fetch fresh data when useCache is false', () => __awaiter(void 0, void 0, void 0, function* () {
        mockedGetAllUserDao.mockResolvedValueOnce(mockUsers);
        yield (0, userService_1.getAllUserService)(false);
        expect(mockedGetAllUserDao).toHaveBeenCalledTimes(1);
    }));
    it('should handle an error from getAllUserDao', () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = 'An error occurred in getAllUserDao';
        mockedGetAllUserDao.mockRejectedValueOnce(new Error(errorMessage));
        yield expect((0, userService_1.getAllUserService)()).rejects.toThrow(errorMessage);
        expect(mockedGetAllUserDao).toHaveBeenCalledTimes(1);
    }));
    // Add more test cases as needed
});
