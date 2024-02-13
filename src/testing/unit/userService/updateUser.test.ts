// Import necessary modules and functions
import { updateUserService } from '../../../services/userService';  // Adjust the import path
import { updateUserDao } from '../../../dataAccessObject/userDao'; // Import the entire module
import bcrypt from 'bcrypt';

// Mock the userDao module and bcrypt module
jest.mock('../../../dataAccessObject/userDao');
jest.mock('bcrypt');

// Example user data for testing
const mockUser = {
  user_id: 1,
  user_email: 'test@example.com',
  user_name: 'testuser',
  user_pass: 'hashedPassword123',
  createdAt: new Date(),
  updatedAt: new Date(),
  is_deleted: 0,
};

describe('updateUserService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update user successfully when ID exists and password is provided', async () => {
    // Mock bcrypt.hash to resolve with a hashed password
    (bcrypt.hash as jest.Mock).mockResolvedValueOnce('hashedPassword123');

    // Mock the implementation of updateUserDao
    (updateUserDao as jest.Mock).mockResolvedValueOnce(mockUser);

    // Call the updateUserService function
    const result = await updateUserService('updatedUser', 'updated@example.com', 'newPassword', 1);

    // Check if updateUserDao was called with the correct arguments
    expect(updateUserDao).toHaveBeenCalledWith('updatedUser', 'updated@example.com', 'hashedPassword123', 1);

    // Check if the result matches the expected user data
    expect(result).toEqual(mockUser);
  });

  it('should update user successfully when ID exists and password is not provided', async () => {
    // Mock the implementation of updateUserDao
    (updateUserDao as jest.Mock).mockResolvedValueOnce(mockUser);

    // Call the updateUserService function without providing a password
    const result = await updateUserService('updatedUser', 'updated@example.com', undefined, 1);

    // Check if updateUserDao was called with the correct arguments
    expect(updateUserDao).toHaveBeenCalledWith('updatedUser', 'updated@example.com', undefined, 1);

    // Check if the result matches the expected user data
    expect(result).toEqual(mockUser);
  });

  it('should handle an error from updateUserDao', async () => {
    // Mock bcrypt.hash to resolve with a hashed password
    (bcrypt.hash as jest.Mock).mockResolvedValueOnce('hashedPassword123');

    // Mock updateUserDao to throw an error
    const errorMessage = 'An error occurred in updateUserDao';
    (updateUserDao as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    // Call updateUserService and expect it to throw an error
    await expect(updateUserService('updatedUser', 'updated@example.com', 'newPassword', 1)).rejects.toThrow(errorMessage);

    // Check if updateUserDao was called with the correct arguments
    expect(updateUserDao).toHaveBeenCalledWith('updatedUser', 'updated@example.com', 'hashedPassword123', 1);
  });

  // Add more test cases as needed
});
