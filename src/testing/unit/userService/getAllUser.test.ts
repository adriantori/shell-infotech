import { getAllUserService } from '../../../services/userService';
import { getAllUserDao } from '../../../dataAccessObject/userDao';

jest.mock('../../../dataAccessObject/userDao');

const mockUsers = [
  { user_id: 1, user_email: 'test1@example.com', user_name: 'testuser1', is_deleted: 0 },
  { user_id: 2, user_email: 'test2@example.com', user_name: 'testuser2', is_deleted: 0 },
];

describe('getAllUserService', () => {
  let mockedGetAllUserDao: jest.Mock;

  beforeEach(() => {
    mockedGetAllUserDao = getAllUserDao as jest.Mock;
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.runAllTimers(); // Ensure all timers are executed
    jest.useRealTimers();
  });

  it('should return all users successfully from cache when useCache is true', async () => {
    mockedGetAllUserDao.mockResolvedValueOnce(mockUsers);

    await getAllUserService();
    const result = await getAllUserService();

    expect(mockedGetAllUserDao).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockUsers);
  });

  it('should not use cache after its expiration', async () => {
    mockedGetAllUserDao.mockResolvedValueOnce(mockUsers);

    await getAllUserService();

    jest.advanceTimersByTime(60001); // Expire the cache (1 minute + 1 ms)

    await getAllUserService(); // This should fetch fresh data

    expect(mockedGetAllUserDao).toHaveBeenCalledTimes(2);
  });

  it('should fetch fresh data when useCache is false', async () => {
    mockedGetAllUserDao.mockResolvedValueOnce(mockUsers);

    await getAllUserService(false);

    expect(mockedGetAllUserDao).toHaveBeenCalledTimes(1);
  });

  it('should handle an error from getAllUserDao', async () => {
    const errorMessage = 'An error occurred in getAllUserDao';
    mockedGetAllUserDao.mockRejectedValueOnce(new Error(errorMessage));

    await expect(getAllUserService()).rejects.toThrow(errorMessage);

    expect(mockedGetAllUserDao).toHaveBeenCalledTimes(1);
  });

  // Add more test cases as needed
});
