// createUserDao.test.ts
import User from '../../../models/userModel';
import { createUserDao } from '../../../dataAccessObject/userDao';

// Mock the User model
jest.mock('../../../models/userModel');

describe('createUserDao', () => {
  const mockCreate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a user successfully', async () => {
    // Mock the successful creation of a user
    jest.spyOn(User, 'create').mockResolvedValueOnce({
      user_id: 1,
      user_name: 'testUser',
      user_email: 'test@example.com',
      user_pass: 'password123',
      createdAt: new Date(),
      updatedAt: new Date(),
      is_deleted: 0,
    });

    const username = 'testUser';
    const email = 'test@example.com';
    const password = 'password123';

    const result = await createUserDao(username, email, password);

    expect(User.create).toHaveBeenCalledWith({
      user_name: username,
      user_email: email,
      user_pass: password,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      is_deleted: 0,
    });

    expect(result).toEqual({
      user_id: 1,
      user_name: 'testUser',
      user_email: 'test@example.com',
      user_pass: 'password123',
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      is_deleted: 0,
    });
  });

  it('should handle validation error', async () => {
    // Mock the creation of a user with validation error
    const validationError = new Error('Validation error: Some validation error message');
    jest.spyOn(User, 'create').mockRejectedValueOnce(validationError);

    const username = 'testUser';
    const email = 'test@example.com';
    const password = 'password123';

    await expect(createUserDao(username, email, password)).rejects.toThrow('Some validation error message');

    expect(User.create).toHaveBeenCalledWith({
      user_name: username,
      user_email: email,
      user_pass: password,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      is_deleted: 0,
    });
  });

  // Add more test cases as needed
});
