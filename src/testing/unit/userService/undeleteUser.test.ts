// Import necessary modules and functions
import { undeleteUserService } from '../../../services/userService';  // Adjust the import path
import { undeleteUserDao } from '../../../dataAccessObject/userDao'; // Import the entire module

// Mock the userDao module
jest.mock('../../../dataAccessObject/userDao');

// Example user data for testing
const mockUser = {
  user_id: 1,
  user_email: 'test@example.com',
  user_name: 'testuser',
  user_pass: 'hashedPassword123',
  updatedAt: new Date(),
  is_deleted: 0,
};

describe('undeleteUserService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should undelete user successfully when ID exists', async () => {
    // Mock the implementation of undeleteUserDao
    (undeleteUserDao as jest.Mock).mockResolvedValueOnce(mockUser);

    // Call the undeleteUserService function
    const result = await undeleteUserService(1);

    // Check if undeleteUserDao was called with the correct argument
    expect(undeleteUserDao).toHaveBeenCalledWith(1);

    // Check if the result matches the expected user data
    expect(result).toEqual(mockUser);
  });

  it('should handle an error from undeleteUserDao', async () => {
    // Mock undeleteUserDao to throw an error
    const errorMessage = 'An error occurred in undeleteUserDao';
    (undeleteUserDao as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    // Call undeleteUserService and expect it to throw an error
    await expect(undeleteUserService(1)).rejects.toThrow(errorMessage);

    // Check if undeleteUserDao was called with the correct argument
    expect(undeleteUserDao).toHaveBeenCalledWith(1);
  });

  // Add more test cases as needed
});
