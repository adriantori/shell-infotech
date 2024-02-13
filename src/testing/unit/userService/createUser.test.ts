// createUserService.test.ts
import bcrypt from 'bcrypt';
import { createUserService } from '../../../services/userService';
import * as userDao from '../../../dataAccessObject/userDao'; // Import the entire module

// Mock the data access object module
jest.mock('../../../dataAccessObject/userDao');

describe('createUserService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create user successfully', async () => {
        const username = 'testUser';
        const email = 'test@example.com';
        const password = 'password123';

        // Mock the bcrypt hash function using spyOn
        const bcryptSpy = jest.spyOn(bcrypt, 'hash') as jest.Mock;
        bcryptSpy.mockResolvedValue('hashedPassword123');

        // Mock the createUserDao function from the userDao module
        const createUserDaoSpy = jest.spyOn(userDao, 'createUserDao').mockResolvedValue({
            user_id: 1,
            user_name: username,
            user_email: email,
            user_pass: 'hashedPassword123',
            createdAt: new Date(),
            updatedAt: new Date(),
            is_deleted: 0,
        });

        const result = await createUserService(username, email, password);

        expect(bcryptSpy).toHaveBeenCalledWith(password, 10);
        expect(createUserDaoSpy).toHaveBeenCalledWith(username, email, 'hashedPassword123');

        // Adjust the expected result based on your actual return value from createUserDao
        expect(result).toEqual({
            user_id: 1,
            user_name: username,
            user_email: email,
            user_pass: 'hashedPassword123',
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
            is_deleted: 0,
        });
    });

    it('should handle error during user creation', async () => {
        const username = 'testUser';
        const email = 'test@example.com';
        const password = 'password123';

        // Mock the bcrypt hash function using spyOn
        const bcryptSpy = jest.spyOn(bcrypt, 'hash') as jest.Mock;
        bcryptSpy.mockResolvedValue('hashedPassword123');

        // Mock the createUserDao function from the userDao module
        jest.spyOn(userDao, 'createUserDao').mockRejectedValueOnce(new Error('Some error during user creation'));

        await expect(createUserService(username, email, password)).rejects.toThrow('Some error during user creation');
    });

    // Add more test cases as needed
});
