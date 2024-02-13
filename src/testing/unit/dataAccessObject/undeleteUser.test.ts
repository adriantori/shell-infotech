import User from '../../../models/userModel';
import { undeleteUserDao } from '../../../dataAccessObject/userDao';

// Mock the User model
jest.mock('../../../models/userModel');

describe('undeleteUserDao', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should undelete user successfully when ID exists', async () => {
        // Mock the successful undeletion of user
        User.update = jest.fn().mockResolvedValueOnce([1]);

        const result = await undeleteUserDao(1);

        expect(User.update).toHaveBeenCalledWith(
            {
                is_deleted: 0,
                updatedAt: expect.any(Date),
            },
            {
                where: {
                    user_id: 1,
                },
                returning: true,
            }
        );

        expect(result).toEqual({ is_deleted: 0, updatedAt: expect.any(Date) });
    });

    it('should handle validation error', async () => {
        // Mock the undeletion of user with validation error
        const validationError = new Error('Validation error: Some validation error message');
        User.update = jest.fn().mockRejectedValueOnce(validationError);

        await expect(undeleteUserDao(1)).rejects.toThrow('Some validation error message');

        expect(User.update).toHaveBeenCalledWith(
            {
                is_deleted: 0,
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
        // Mock the undeletion of user when ID does not exist
        User.update = jest.fn().mockResolvedValueOnce([0]);

        await expect(undeleteUserDao(1)).rejects.toThrow('No user undeleted');

        expect(User.update).toHaveBeenCalledWith(
            {
                is_deleted: 0,
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