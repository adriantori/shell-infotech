// Import necessary modules and functions
import { getUserService } from '../../../services/userService';  // Adjust the import path
import * as userDaoModule from '../../../dataAccessObject/userDao'; // Import the entire module

// Mock the userDao module
jest.mock('../../../dataAccessObject/userDao');
const { getUserDao } = userDaoModule; // Destructure the function from the module

// Example user data for testing
const mockUser = { user_id: 1, user_email: 'test@example.com', user_name: 'testuser', is_deleted: 0 };

describe('getUserService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get user successfully when ID exists', async () => {
    // Mock the implementation of getUserDao
    (getUserDao as jest.Mock).mockResolvedValueOnce(mockUser);

    const result = await getUserService(1);

    expect(getUserDao).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockUser);
  });

  it('should handle an error from getUserDao', async () => {
    // Mock getUserDao to throw an error
    const errorMessage = 'An error occurred in getUserDao';
    (getUserDao as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    await expect(getUserService(1)).rejects.toThrow(errorMessage);

    expect(getUserDao).toHaveBeenCalledWith(1);
  });

  // Add more test cases as needed
});
