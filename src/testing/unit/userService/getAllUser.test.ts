import { getAllUserService } from '../../../services/userService';
import { getAllUserDao } from '../../../dataAccessObject/userDao';

jest.mock('../../../dataAccessObject/userDao');

const mockUsers = [
  { user_id: 1, user_email: 'test1@example.com', user_name: 'testuser1', is_deleted: 0 },
  { user_id: 2, user_email: 'test2@example.com', user_name: 'testuser2', is_deleted: 0 },
];

describe('getAllUserService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all users successfully from cache when useCache is true', async () => {
    // Mock the implementation of getAllUserDao
    (getAllUserDao as jest.MockedFunction<typeof getAllUserDao>).mockResolvedValueOnce(mockUsers);

    // Call the function twice, first time to populate the cache
    await getAllUserService();
    // Second time to retrieve from the cache
    const result = await getAllUserService();

    expect(getAllUserDao).toHaveBeenCalledTimes(1); // Ensure getAllUserDao is called only once
    expect(result).toEqual(mockUsers); // Ensure the result is as expected
  });

  it('should not use cache after its expiration', async () => {
    // Mock the implementation of getAllUserDao
    (getAllUserDao as jest.MockedFunction<typeof getAllUserDao>).mockResolvedValueOnce(mockUsers);
  
    // Call the function once to populate the cache
    await getAllUserService();
  
    // Manually expire the cache
    jest.advanceTimersByTime(60001); // Expire the cache (1 minute + 1 ms)
  
    // Use await to ensure timers are advanced before making assertions
    await new Promise(resolve => setTimeout(resolve, 0));
  
    // Call the function again, it should fetch fresh data
    const result = await getAllUserService();
  
    expect(getAllUserDao).toHaveBeenCalledTimes(2); // Ensure getAllUserDao is called twice (once for cache, once for fresh data)
    expect(result).toEqual(mockUsers); // Ensure the result is as expected
  });
  

  it('should fetch fresh data when useCache is false', async () => {
    // Mock getAllUserDao to throw an error
    (getAllUserDao as jest.MockedFunction<typeof getAllUserDao>).mockResolvedValueOnce(mockUsers);

    // Call the function with useCache set to false
    const result = await getAllUserService(false);

    expect(getAllUserDao).toHaveBeenCalledTimes(1); // Ensure getAllUserDao is called once (no cache involved)
    expect(result).toEqual(mockUsers); // Ensure the result is as expected
  });

  it('should handle an error from getAllUserDao', async () => {
    // Mock getAllUserDao to throw an error
    const errorMessage = 'An error occurred in getAllUserDao';
    (getAllUserDao as jest.MockedFunction<typeof getAllUserDao>).mockRejectedValueOnce(new Error(errorMessage));
  
    // Ensure the promise is rejected
    await expect(getAllUserService()).rejects.toThrow(errorMessage);
  
    expect(getAllUserDao).toHaveBeenCalledTimes(1); // Ensure getAllUserDao is called once
  });
  

  // Add more test cases as needed
});
