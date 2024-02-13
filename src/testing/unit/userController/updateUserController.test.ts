// updateUserController.test.ts
import { Request, Response } from 'express';
import { updateUserController } from '../../../controllers/userController'; // Update this with your actual controller path
import { updateUserService } from '../../../services/userService'; // Update this with your actual service path

// Mock the service
jest.mock('../../../services/userService'); // Update this with your actual service path

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
    // Mock the updateUserService to return a user
    (updateUserService as jest.Mock).mockResolvedValueOnce({ /* mocked user data */ });

    await updateUserController(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Update User success',
    });
  });

  it('should handle case when ID does not exist', async () => {
    // Mock the updateUserService to return null
    (updateUserService as jest.Mock).mockResolvedValueOnce(null);

    await updateUserController(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'ID does not exist',
    });
  });

  it('should handle internal server error', async () => {
    // Mock the updateUserService to throw an error
    (updateUserService as jest.Mock).mockRejectedValueOnce(new Error('Internal Server Error'));

    await updateUserController(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Internal Server Error',
    });
  });
});
