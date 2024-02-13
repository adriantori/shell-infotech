// getUserByIdController.test.ts
import { Request, Response } from 'express';
import { getUserByIdController } from '../../../controllers/userController'; // Update this with your actual controller path
import { getUserService } from '../../../services/userService'; // Update this with your actual service path

// Mock the service
jest.mock('../../../services/userService'); // Update this with your actual service path

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
    // Mock the getUserService to return a user
    (getUserService as jest.Mock).mockResolvedValueOnce([{ /* mocked user data */ }]);

    await getUserByIdController(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'User retrieved successfully',
      data: [{ /* mocked user data */ }],
    });
  });

  it('should handle case when user does not exist', async () => {
    // Mock the getUserService to return an empty array
    (getUserService as jest.Mock).mockResolvedValueOnce([]);

    await getUserByIdController(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'User does not exist',
    });
  });

  it('should handle internal server error', async () => {
    // Mock the getUserService to throw an error
    (getUserService as jest.Mock).mockRejectedValueOnce(new Error('Internal Server Error'));

    await getUserByIdController(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Internal Server Error',
    });
  });
});
