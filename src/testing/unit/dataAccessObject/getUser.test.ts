// getUserDao.test.ts
import { Model, DataTypes, Optional } from 'sequelize';
import User from '../../../models/userModel';
import { getUserDao } from '../../../dataAccessObject/userDao';

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

describe('getUserDao', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should retrieve user by ID successfully', async () => {
    // Mock the successful retrieval of user
    const mockUser = {
      user_id: 1,
      user_name: 'testUser',
      user_email: 'test@example.com',
      user_pass: 'password123',
      createdAt: new Date(),
      updatedAt: new Date(),
      is_deleted: 0,
    } as UserInstance;

    jest.spyOn(User, 'findAll').mockResolvedValueOnce([mockUser]);

    const result = await getUserDao(1);

    expect(User.findAll).toHaveBeenCalledWith({
      where: {
        is_deleted: 0,
        user_id: 1,
      },
    });

    expect(result).toEqual([mockUser]);
  });

  it('should handle validation error', async () => {
    // Mock the retrieval of user with validation error
    const validationError = new Error('Validation error: Some validation error message');
    jest.spyOn(User, 'findAll').mockRejectedValueOnce(validationError);

    await expect(getUserDao(1)).rejects.toThrow('Some validation error message');

    expect(User.findAll).toHaveBeenCalledWith({
      where: {
        is_deleted: 0,
        user_id: 1,
      },
    });
  });

  // Add more test cases as needed
});
