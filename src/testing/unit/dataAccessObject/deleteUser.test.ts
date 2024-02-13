// deleteUserDao.test.ts
import User from '../../../models/userModel';
import { deleteUserDao } from '../../../dataAccessObject/userDao';

// Mock the User model
jest.mock('../../../models/userModel');



describe('deleteUserDao', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should delete user successfully when ID exists', async () => {
    // Mock the successful deletion of user
    User.update = jest.fn().mockResolvedValueOnce([1]);

    const result = await deleteUserDao(1);

    expect(User.update).toHaveBeenCalledWith(
      {
        is_deleted: 1,
        updatedAt: expect.any(Date),
      },
      {
        where: {
          user_id: 1,
        },
        returning: true,
      }
    );

    expect(result).toEqual({ is_deleted: 1, updatedAt: expect.any(Date) });
  });

  it('should handle validation error', async () => {
    // Mock the deletion of user with validation error
    const validationError = new Error('Validation error: Some validation error message');
    User.update = jest.fn().mockRejectedValueOnce(validationError);

    await expect(deleteUserDao(1)).rejects.toThrow('Some validation error message');

    expect(User.update).toHaveBeenCalledWith(
      {
        is_deleted: 1,
        updatedAt: expect.any(Date),
      },
      {
        where: {
          user_id: 1,
        },
        returning: true,
      }
    );
  });

  it('should handle case when ID does not exist', async () => {
    // Mock the deletion of user when ID does not exist
    User.update = jest.fn().mockResolvedValueOnce([0]);

    await expect(deleteUserDao(1)).rejects.toThrow('No user deleted');

    expect(User.update).toHaveBeenCalledWith(
      {
        is_deleted: 1,
        updatedAt: expect.any(Date),
      },
      {
        where: {
          user_id: 1,
        },
        returning: true,
      }
    );
  });

  // Add more test cases as needed
});
