import * as bcrypt from 'bcrypt';
import { createUserService } from '../../../services/userService';
import { createUserDao } from '../../../dataAccessObject/userDao';

jest.mock('bcrypt');
jest.mock('../../../dataAccessObject/userDao');

const mockCreateUserDao = createUserDao as jest.MockedFunction<typeof createUserDao>;

const mockUser = { user_id: 1, user_email: 'test@example.com', user_name: 'testuser', is_deleted: 0 };

describe('createUserService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create user successfully', async () => {
    // Mock createUserDao
    mockCreateUserDao.mockResolvedValueOnce(mockUser);

    // Mock bcrypt.hash to resolve immediately with a hashed password
    (bcrypt.hash as jest.Mock).mockResolvedValueOnce('hashedPassword');

    const result = await createUserService('testuser', 'test@example.com', 'password123');

    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
    expect(mockCreateUserDao).toHaveBeenCalledWith('testuser', 'test@example.com', 'hashedPassword');
    expect(result).toEqual(mockUser);
  });

  it('should handle an error from createUserDao', async () => {
    const errorMessage = 'An error occurred in createUserDao';
    mockCreateUserDao.mockRejectedValueOnce(new Error(errorMessage));

    // Mock bcrypt.hash to resolve immediately with a hashed password
    (bcrypt.hash as jest.Mock).mockResolvedValueOnce('hashedPassword');

    await expect(createUserService('testuser', 'test@example.com', 'password123')).rejects.toThrow(errorMessage);

    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
    expect(mockCreateUserDao).toHaveBeenCalledWith('testuser', 'test@example.com', 'hashedPassword');
  });

  // Add more test cases as needed
});
