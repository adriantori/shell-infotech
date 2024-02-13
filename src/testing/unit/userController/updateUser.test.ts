// updateUserController.test.ts
import { Request, Response } from 'express';
import { updateUserController } from '../../../controllers/userController'; // Update this with your actual controller path
import * as userService from '../../../services/userService'; // Update this with your actual service path

describe('updateUserController', () => {
  const mockRequest = {
    body: {
      username: 'testUser',
      email: 'test@example.com',
      password: 'newPassword',
    },
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

  it('should update user successfully when ID exists', async () => {
    const mockUser = { /* mocked user data */ };
    const spyOnUpdateUserService = jest.spyOn(userService, 'updateUserService').mockResolvedValueOnce(mockUser);

    await updateUserController(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Update User success',
    });

    // Restore the original function after the test
    spyOnUpdateUserService.mockRestore();
  });

  it('should handle case when ID does not exist', async () => {
    const spyOnUpdateUserService = jest.spyOn(userService, 'updateUserService').mockResolvedValueOnce(null);

    await updateUserController(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'ID does not exist',
    });

    // Restore the original function after the test
    spyOnUpdateUserService.mockRestore();
  });

  it('should handle internal server error', async () => {
    const mockError = new Error('Internal Server Error');
    const spyOnUpdateUserService = jest.spyOn(userService, 'updateUserService').mockRejectedValueOnce(mockError);

    await updateUserController(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Internal Server Error',
    });

    // Restore the original function after the test
    spyOnUpdateUserService.mockRestore();
  });
});
