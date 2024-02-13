// getAllUserController.test.ts
import { Request, Response } from 'express';
import { getAllUserController } from '../../../controllers/userController';
import * as userService from '../../../services/userService';

jest.mock('../../../services/userService');

describe('getAllUserController', () => {
  const mockRequest = {} as Request;
  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should retrieve users successfully', async () => {
    // Mock getAllUserService to return mockUsers
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
      // Add more mock users as needed
    ];

    const getAllUserServiceSpy = jest.spyOn(userService, 'getAllUserService');
    getAllUserServiceSpy.mockResolvedValueOnce(mockUsers);

    await getAllUserController(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Users retrieved successfully',
      data: mockUsers,
    });

    // Restore the original implementation after the test
    getAllUserServiceSpy.mockRestore();
  });

  it('should handle internal server error', async () => {
    // Mock getAllUserService to throw an error
    const mockError = new Error('Internal Server Error');
    const getAllUserServiceSpy = jest.spyOn(userService, 'getAllUserService');
    getAllUserServiceSpy.mockRejectedValueOnce(mockError);

    await getAllUserController(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: mockError.message,
    });

    // Restore the original implementation after the test
    getAllUserServiceSpy.mockRestore();
  });
});
