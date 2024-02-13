import { sequelize } from '../../../middlewares/database';
import User from '../../../models/userModel';

describe('User Model', () => {
  beforeAll(async () => {
    // Connect to the test database
    await sequelize.sync({ force: true }); // Force sync to create tables
  });

  afterAll(async () => {
    // Close the database connection
    await sequelize.close();
  });

  it('should create a new user', async () => {
    const user = await User.create({
      user_email: 'test@example.com',
      user_name: 'testuser',
      user_pass: 'testpassword',
      is_deleted: 0,
    });

    expect(user).toBeDefined();
    expect(user.user_id).toBeDefined();
    expect(user.user_email).toBe('test@example.com');
    // Add more assertions based on your model structure
  });

  it('should validate unique username', async () => {
    // Create a user with a specific username
    await User.create({
      user_email: 'test2@example.com',
      user_name: 'uniqueuser',
      user_pass: 'testpassword',
      is_deleted: 0,
    });

    // Try to create another user with the same username
    await expect(
      User.create({
        user_email: 'test3@example.com',
        user_name: 'uniqueuser',
        user_pass: 'testpassword',
        is_deleted: 0,
      })
    ).rejects.toThrowError('This username is already taken');
  });

  // Add more test cases as needed
});
