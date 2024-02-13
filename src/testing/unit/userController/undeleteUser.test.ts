// undeleteUserController.test.ts
import { Request, Response } from 'express';
import { undeleteUserController } from '../../../controllers/userController'; // Update this with your actual controller path
import { undeleteUserService } from '../../../services/userService'; // Update this with your actual service path

// Mock the service
jest.mock('../../../services/userService'); // Update this with your actual service path

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
    // Mock the undeleteUserService to return a user
    (undeleteUserService as jest.Mock).mockResolvedValueOnce({ /* mocked user data */ });

    await undeleteUserController(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Restore User success',
    });
  });

  it('should handle case when ID does not exist', async () => {
    // Mock the undeleteUserService to return null
    (undeleteUserService as jest.Mock).mockResolvedValueOnce(null);

    await undeleteUserController(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'ID does not exist',
    });
  });

  it('should handle internal server error', async () => {
    // Mock the undeleteUserService to throw an error
    (undeleteUserService as jest.Mock).mockRejectedValueOnce(new Error('Internal Server Error'));

    await undeleteUserController(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Internal Server Error',
    });
  });
});
