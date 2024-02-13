// Import necessary modules and functions
import { getUserService } from '../../../services/userService';  // Adjust the import path
import { getUserDao } from '../../../dataAccessObject/userDao'; // Import the entire module

// Mock the userDao module
jest.mock('../../../dataAccessObject/userDao');

// Example user data for testing
const mockUser = {
  user_id: 1,
  user_email: 'test@example.com',
  user_name: 'testuser',
  user_pass: 'testpassword',
  createdAt: new Date(),
  updatedAt: new Date(),
  is_deleted: 0,
};

describe('getUserService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get user successfully when ID exists', async () => {
    // Mock the implementation of getUserDao
    (getUserDao as jest.Mock).mockResolvedValueOnce(mockUser);

    // Call the getUserService function
    const result = await getUserService(1);

    // Check if getUserDao was called with the correct arguments
    expect(getUserDao).toHaveBeenCalledWith(1);

    // Check if the result matches the expected user data
    expect(result).toEqual(mockUser);
  });

  it('should handle an error from getUserDao', async () => {
    // Mock getUserDao to throw an error
    const errorMessage = 'An error occurred in getUserDao';
    (getUserDao as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    // Call getUserService and expect it to throw an error
    await expect(getUserService(1)).rejects.toThrow(errorMessage);

    // Check if getUserDao was called with the correct arguments
    expect(getUserDao).toHaveBeenCalledWith(1);
  });

  // Add more test cases as needed
});
