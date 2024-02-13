// Import necessary modules and functions
import { deleteUserService } from '../../../services/userService';  // Adjust the import path
import { deleteUserDao } from '../../../dataAccessObject/userDao'; // Import the entire module

// Mock the userDao module
jest.mock('../../../dataAccessObject/userDao');

// Example user data for testing
const mockUser = {
  user_id: 1,
  user_email: 'test@example.com',
  user_name: 'testuser',
  user_pass: 'hashedPassword123',
  createdAt: new Date(),
  updatedAt: new Date(),
  is_deleted: 1,
};

describe('deleteUserService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should delete user successfully when ID exists', async () => {
    // Mock the implementation of deleteUserDao
    (deleteUserDao as jest.Mock).mockResolvedValueOnce(mockUser);

    // Call the deleteUserService function
    const result = await deleteUserService(1);

    // Check if deleteUserDao was called with the correct argument
    expect(deleteUserDao).toHaveBeenCalledWith(1);

    // Check if the result matches the expected user data
    expect(result).toEqual(mockUser);
  });

  it('should handle an error from deleteUserDao', async () => {
    // Mock deleteUserDao to throw an error
    const errorMessage = 'An error occurred in deleteUserDao';
    (deleteUserDao as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    // Call deleteUserService and expect it to throw an error
    await expect(deleteUserService(1)).rejects.toThrow(errorMessage);

    // Check if deleteUserDao was called with the correct argument
    expect(deleteUserDao).toHaveBeenCalledWith(1);
  });

  // Add more test cases as needed
});
