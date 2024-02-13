// getAllUserDao.test.ts
import { Model, DataTypes, Optional } from 'sequelize';
import User from '../../../models/userModel';
import { getAllUserDao } from '../../../dataAccessObject/userDao';

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

describe('getAllUserDao', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should retrieve all users successfully', async () => {
    // Mock the successful retrieval of users
    const mockUsers = [
      {
        user_id: 1,
        user_name: 'user1',
        user_email: 'user1@example.com',
        user_pass: 'password1',
        createdAt: new Date(),
        updatedAt: new Date(),
        is_deleted: 0,
      },
      {
        user_id: 2,
        user_name: 'user2',
        user_email: 'user2@example.com',
        user_pass: 'password2',
        createdAt: new Date(),
        updatedAt: new Date(),
        is_deleted: 0,
      },
    ] as UserInstance[];

    jest.spyOn(User, 'findAll').mockResolvedValueOnce(mockUsers);

    const result = await getAllUserDao();

    expect(User.findAll).toHaveBeenCalledWith({
      order: [
        ['user_id', 'ASC'],
      ],
    });

    expect(result).toEqual(mockUsers);
  });

  it('should handle validation error', async () => {
    // Mock the retrieval of users with validation error
    const validationError = new Error('Validation error: Some validation error message');
    jest.spyOn(User, 'findAll').mockRejectedValueOnce(validationError);

    await expect(getAllUserDao()).rejects.toThrow('Some validation error message');

    expect(User.findAll).toHaveBeenCalledWith({
      order: [
        ['user_id', 'ASC'],
      ],
    });
  });

  // Add more test cases as needed
});
