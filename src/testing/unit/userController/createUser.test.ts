// createUserController.test.ts
import { Request, Response } from 'express';
import { createUserController } from '../../../controllers/userController';
import * as userService from '../../../services/userService';

describe('createUserController', () => {
  const mockRequest = {
    body: {
      username: 'testUser',
      email: 'test@example.com',
      password: 'password123',
    },
  } as Request;

  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create user successfully', async () => {
    const mockUser = { username: 'testUser', email: 'test@example.com' };
    const userServiceMock = jest.spyOn(userService, 'createUserService').mockResolvedValueOnce(mockUser);

    await createUserController(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Create User success',
      data: mockUser,
    });

    userServiceMock.mockRestore();
  });

  it('should handle username already exists', async () => {
    const userServiceMock = jest.spyOn(userService, 'createUserService').mockResolvedValueOnce(null);

    await createUserController(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(409);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Username already exist',
      data: null,
    });

    userServiceMock.mockRestore();
  });

  it('should handle internal server error', async () => {
    const mockError = new Error('Internal Server Error');
    const userServiceMock = jest.spyOn(userService, 'createUserService').mockRejectedValueOnce(mockError);

    await createUserController(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: mockError.message,
    });

    userServiceMock.mockRestore();
  });
});
