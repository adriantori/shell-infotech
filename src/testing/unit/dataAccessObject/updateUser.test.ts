// updateUserDao.test.ts
import { Model } from 'sequelize';
import User from '../../../models/userModel';
import { updateUserDao } from '../../../dataAccessObject/userDao';

// Mock the User model
jest.mock('../../../models/userModel');

// Define a mock model class to ensure correct typing
class MockUser extends Model {
  public user_id!: number;
  public user_name!: string;
  public user_email!: string;
  public user_pass!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
  public is_deleted!: number;
}

type UserInstance = MockUser;

describe('updateUserDao', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update user successfully when ID exists', async () => {
    // Mock the successful update of user
    const mockUpdatedUser = {
      user_id: 1,
      user_name: 'updatedUser',
      user_email: 'updated@example.com',
      user_pass: 'updatedPassword',
      createdAt: new Date(),
      updatedAt: new Date(),
      is_deleted: 0,
    } as UserInstance;

    // Use a direct mock without spyOn and mockImplementation
    User.update = jest.fn().mockResolvedValueOnce([1, [mockUpdatedUser]]);

    const result = await updateUserDao('updatedUser', 'updated@example.com', 'updatedPassword', 1);

    expect(User.update).toHaveBeenCalledWith(
      {
        user_name: 'updatedUser',
        user_email: 'updated@example.com',
        user_pass: 'updatedPassword',
        updatedAt: expect.any(Date),
      },
      {
        where: {
          is_deleted: 0,
          user_id: 1,
        },
        returning: true,
      }
    );

    expect(result).toEqual(mockUpdatedUser);
  });

  it('should handle validation error', async () => {
    // Mock the update of user with validation error
    const validationError = new Error('Validation error: Some validation error message');
    User.update = jest.fn().mockRejectedValueOnce(validationError);

    await expect(updateUserDao('updatedUser', 'updated@example.com', 'updatedPassword', 1)).rejects.toThrow(
      'Some validation error message'
    );

    expect(User.update).toHaveBeenCalledWith(
      {
        user_name: 'updatedUser',
        user_email: 'updated@example.com',
        user_pass: 'updatedPassword',
        updatedAt: expect.any(Date),
      },
      {
        where: {
          is_deleted: 0,
          user_id: 1,
        },
        returning: true,
      }
    );
  });

  it('should handle case when ID does not exist', async () => {
    // Mock the update of user when ID does not exist
    User.update = jest.fn().mockResolvedValueOnce([0, []]);

    await expect(updateUserDao('updatedUser', 'updated@example.com', 'updatedPassword', 1)).rejects.toThrow(
      'No user updated'
    );

    expect(User.update).toHaveBeenCalledWith(
      {
        user_name: 'updatedUser',
        user_email: 'updated@example.com',
        user_pass: 'updatedPassword',
        updatedAt: expect.any(Date),
      },
      {
        where: {
          is_deleted: 0,
          user_id: 1,
        },
        returning: true,
      }
    );
  });

  // Add more test cases as needed
});
