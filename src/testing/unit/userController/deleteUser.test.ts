// deleteUserController.test.ts
import { Request, Response } from 'express';
import { deleteUserController } from '../../../controllers/userController'; // Update this with your actual controller path
import { deleteUserService } from '../../../services/userService'; // Update this with your actual service path

// Mock the service
jest.mock('../../../services/userService'); // Update this with your actual service path

describe('deleteUserController', () => {
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

  it('should delete user successfully when ID exists', async () => {
    // Mock the deleteUserService to return a user
    (deleteUserService as jest.Mock).mockResolvedValueOnce({ /* mocked user data */ });

    await deleteUserController(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Delete User success',
    });
  });

  it('should handle case when ID does not exist', async () => {
    // Mock the deleteUserService to return null
    (deleteUserService as jest.Mock).mockResolvedValueOnce(null);

    await deleteUserController(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'ID does not exist',
    });
  });

  it('should handle internal server error', async () => {
    // Mock the deleteUserService to throw an error
    (deleteUserService as jest.Mock).mockRejectedValueOnce(new Error('Internal Server Error'));

    await deleteUserController(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Internal Server Error',
    });
  });
});
