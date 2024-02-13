// getAllUser.test.ts
import User from '../../../models/userModel';
import { getAllUserService } from '../../../services/userService';  // Adjust the import path

jest.mock('../../../models/userModel');

const mockUsers = [
  {
    user_id: 1,
    user_email: 'user1@example.com',
    user_name: 'user1',
    user_pass: 'password1',
    createdAt: new Date(),
    updatedAt: new Date(),
    is_deleted: 0,
  },
  {
    user_id: 2,
    user_email: 'user2@example.com',
    user_name: 'user2',
    user_pass: 'password2',
    createdAt: new Date(),
    updatedAt: new Date(),
    is_deleted: 0,
  },
];

describe('getAllUserService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all users successfully', async () => {
    // Mock the implementation of User.findAll
    (User.findAll as jest.Mock).mockResolvedValueOnce(mockUsers); // Replace mockUsers with your test data

    const result = await getAllUserService();

    expect(User.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockUsers);
  });

  it('should handle an error from getAllUserDao', async () => {
    const errorMessage = 'An error occurred in getAllUserDao';
    (User.findAll as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    await expect(getAllUserService()).rejects.toThrow(errorMessage);

    expect(User.findAll).toHaveBeenCalledTimes(1);
  });

  // Add a test case for handling an error from User.findAll if needed
});
