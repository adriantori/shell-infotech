// getUserByIdController.test.ts
import { Request, Response } from 'express';
import { getUserByIdController } from '../../../controllers/userController'; // Update this with your actual controller path
import * as userService from '../../../services/userService'; // Update this with your actual service path

describe('getUserByIdController', () => {
  const mockRequest = {
    params: {
      id: '1', // Assuming the user ID is '1' for testing
    },
  } as unknown as Request;

  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should retrieve user successfully when user exists', async () => {
    const mockUser = [{ /* mocked user data */ }];
    const spyOnGetUserService = jest.spyOn(userService, 'getUserService').mockResolvedValueOnce(mockUser);

    await getUserByIdController(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'User retrieved successfully',
      data: mockUser,
    });

    // Restore the original function after the test
    spyOnGetUserService.mockRestore();
  });

  it('should handle case when user does not exist', async () => {
    const spyOnGetUserService = jest.spyOn(userService, 'getUserService').mockResolvedValueOnce([]);

    await getUserByIdController(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'User does not exist',
    });

    // Restore the original function after the test
    spyOnGetUserService.mockRestore();
  });

  it('should handle internal server error', async () => {
    const mockError = new Error('Internal Server Error');
    const spyOnGetUserService = jest.spyOn(userService, 'getUserService').mockRejectedValueOnce(mockError);

    await getUserByIdController(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Internal Server Error',
    });

    // Restore the original function after the test
    spyOnGetUserService.mockRestore();
  });
});
