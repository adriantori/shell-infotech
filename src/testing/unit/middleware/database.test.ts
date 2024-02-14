import { attachDB, sequelize } from '../../../middlewares/database';
import { Request, Response, NextFunction } from 'express';
import { Sequelize } from 'sequelize';

// Mock Sequelize to simulate its behavior
jest.mock('sequelize');

describe('attachDB middleware', () => {
  let req: Request & { sequelize: Sequelize };
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    // Initialize req, res, and next for each test
    req = { sequelize } as any;
    res = {} as any;
    next = jest.fn();
  });

  afterEach(() => {
    // Clear mock function calls after each test
    jest.clearAllMocks();
  });

  it('should attach sequelize instance to request object', () => {
    // Call the middleware
    attachDB(req, res, next);

    // Assert that req.sequelize is set to the mock Sequelize instance
    expect(req.sequelize).toBe(sequelize);
    // Assert that the next function was called
    expect(next).toHaveBeenCalled();
  });

  // Add more test cases as needed

});
