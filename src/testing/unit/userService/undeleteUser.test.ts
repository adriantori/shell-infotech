// dist/testing/unit/userService/undeleteUser.test.js

// Import necessary modules and functions
import { undeleteUserService } from '../../../services/userService';
import { undeleteUserDao } from '../../../dataAccessObject/userDao';

// Mock the userDao module
jest.mock('../../../dataAccessObject/userDao');

// Example user data for testing
const mockUser = { user_id: 1, user_email: 'test@example.com', user_name: 'testuser', is_deleted: 0 };

describe('undeleteUserService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should undelete user successfully when ID exists', async () => {
    // Mock the implementation of undeleteUserDao
    (undeleteUserDao as jest.MockedFunction<typeof undeleteUserDao>).mockResolvedValueOnce(mockUser);

    const result = await undeleteUserService(1);

    expect(undeleteUserDao).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockUser);
  });

  it('should handle an error from undeleteUserDao', async () => {
    // Mock undeleteUserDao to throw an error
    const errorMessage = 'An error occurred in undeleteUserDao';
    (undeleteUserDao as jest.MockedFunction<typeof undeleteUserDao>).mockRejectedValueOnce(new Error(errorMessage));

    await expect(undeleteUserService(1)).rejects.toThrow(errorMessage);

    expect(undeleteUserDao).toHaveBeenCalledWith(1);
  });

  // Add more test cases as needed
});
