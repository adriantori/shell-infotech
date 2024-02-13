// dist/testing/unit/userService/getAllUser.test.js

// Import necessary modules and functions
import { getAllUserService } from '../../../services/userService';
import { getAllUserDao } from '../../../dataAccessObject/userDao';

// Mock the userDao module
jest.mock('../../../dataAccessObject/userDao');

// Example user data for testing
const mockUsers = [
  { user_id: 1, user_email: 'test1@example.com', user_name: 'testuser1', is_deleted: 0 },
  { user_id: 2, user_email: 'test2@example.com', user_name: 'testuser2', is_deleted: 0 },
  // Add more mock data as needed
];

describe('getAllUserService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all users successfully', async () => {
    // Mock the implementation of getAllUserDao
    (getAllUserDao as jest.MockedFunction<typeof getAllUserDao>).mockResolvedValueOnce(mockUsers);

    const result = await getAllUserService();

    expect(getAllUserDao).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockUsers);
  });

  it('should handle an error from getAllUserDao', async () => {
    // Mock getAllUserDao to throw an error
    const errorMessage = 'An error occurred in getAllUserDao';
    (getAllUserDao as jest.MockedFunction<typeof getAllUserDao>).mockRejectedValueOnce(new Error(errorMessage));

    await expect(getAllUserService()).rejects.toThrow(errorMessage);

    expect(getAllUserDao).toHaveBeenCalledTimes(1);
  });

  // Add more test cases as needed
});
