// undeleteUserController.test.ts
import { Request, Response } from 'express';
import { undeleteUserController } from '../../../controllers/userController'; // Update this with your actual controller path
import * as userService from '../../../services/userService'; // Update this with your actual service path

describe('undeleteUserController', () => {
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

  it('should restore user successfully when ID exists', async () => {
    const mockUser = { /* mocked user data */ };
    const spyOnUndeleteUserService = jest.spyOn(userService, 'undeleteUserService').mockResolvedValueOnce(mockUser);

    await undeleteUserController(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Restore User success',
    });

    // Restore the original function after the test
    spyOnUndeleteUserService.mockRestore();
  });

  it('should handle case when ID does not exist', async () => {
    const spyOnUndeleteUserService = jest.spyOn(userService, 'undeleteUserService').mockResolvedValueOnce(null);

    await undeleteUserController(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'ID does not exist',
    });

    // Restore the original function after the test
    spyOnUndeleteUserService.mockRestore();
  });

  it('should handle internal server error', async () => {
    const mockError = new Error('Internal Server Error');
    const spyOnUndeleteUserService = jest.spyOn(userService, 'undeleteUserService').mockRejectedValueOnce(mockError);

    await undeleteUserController(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Internal Server Error',
    });

    // Restore the original function after the test
    spyOnUndeleteUserService.mockRestore();
  });
});
