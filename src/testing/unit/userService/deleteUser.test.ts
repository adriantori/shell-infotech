// dist/testing/unit/userService/deleteUser.test.js

// Import necessary modules and functions
import { deleteUserService } from '../../../services/userService';
import { deleteUserDao } from '../../../dataAccessObject/userDao';

// Mock the userDao module
jest.mock('../../../dataAccessObject/userDao');

// Example user data for testing
const mockUser = { user_id: 1, user_email: 'test@example.com', user_name: 'testuser', is_deleted: 1 };

describe('deleteUserService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should delete user successfully when ID exists', async () => {
    // Mock the implementation of deleteUserDao
    (deleteUserDao as jest.MockedFunction<typeof deleteUserDao>).mockResolvedValueOnce(mockUser);

    const result = await deleteUserService(1);

    expect(deleteUserDao).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockUser);
  });

  it('should handle an error from deleteUserDao', async () => {
    // Mock deleteUserDao to throw an error
    const errorMessage = 'An error occurred in deleteUserDao';
    (deleteUserDao as jest.MockedFunction<typeof deleteUserDao>).mockRejectedValueOnce(new Error(errorMessage));

    await expect(deleteUserService(1)).rejects.toThrow(errorMessage);

    expect(deleteUserDao).toHaveBeenCalledWith(1);
  });

  // Add more test cases as needed
});
