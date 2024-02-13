import { updateUserService } from '../../../services/userService';
import { updateUserDao } from '../../../dataAccessObject/userDao';
import * as bcrypt from 'bcrypt';

jest.mock('../../../dataAccessObject/userDao');
jest.mock('bcrypt', () => ({
  ...jest.requireActual('bcrypt'),
  hash: jest.fn().mockImplementation((password: string) => Promise.resolve(`hashedPassword123`)),
}));

const mockUser = { user_id: 1, user_email: 'test@example.com', user_name: 'testuser', is_deleted: 0 };

describe('updateUserService', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should update user successfully when ID exists and password is provided', async () => {
    (updateUserDao as jest.Mock).mockResolvedValueOnce(mockUser);

    const result = await updateUserService('updatedUser', 'updated@example.com', 'password123', 1);

    expect(updateUserDao).toHaveBeenCalledWith('updatedUser', 'updated@example.com', 'hashedPassword123', 1);
    expect(result).toEqual(mockUser);
  });

  it('should handle an error from updateUserDao when password is provided', async () => {
    const errorMessage = 'An error occurred in updateUserDao';
    (updateUserDao as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    await expect(updateUserService('updatedUser', 'updated@example.com', 'password123', 1)).rejects.toThrow(errorMessage);

    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
    expect(updateUserDao).toHaveBeenCalledWith('updatedUser', 'updated@example.com', 'hashedPassword123', 1);
  });

  it('should handle an error from updateUserDao when password is not provided', async () => {
    const errorMessage = 'An error occurred in updateUserDao';
    (updateUserDao as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    await expect(updateUserService('updatedUser', 'updated@example.com', undefined, 1)).rejects.toThrow(errorMessage);

    expect(updateUserDao).toHaveBeenCalledWith('updatedUser', 'updated@example.com', undefined, 1);
  });

  // Add more test cases as needed...
});
