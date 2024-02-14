"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../../../middlewares/database");
// Mock Sequelize to simulate its behavior
jest.mock('sequelize');
describe('attachDB middleware', () => {
    let req;
    let res;
    let next;
    beforeEach(() => {
        // Initialize req, res, and next for each test
        req = { sequelize: database_1.sequelize };
        res = {};
        next = jest.fn();
    });
    afterEach(() => {
        // Clear mock function calls after each test
        jest.clearAllMocks();
    });
    it('should attach sequelize instance to request object', () => {
        // Call the middleware
        (0, database_1.attachDB)(req, res, next);
        // Assert that req.sequelize is set to the mock Sequelize instance
        expect(req.sequelize).toBe(database_1.sequelize);
        // Assert that the next function was called
        expect(next).toHaveBeenCalled();
    });
    // Add more test cases as needed
});
