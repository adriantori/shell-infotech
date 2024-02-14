import { sequelize } from '../../../middlewares/database';
import User from '../../../models/userModel';

describe('User Model', () => {
  beforeAll(async () => {
    // Connect to the test database
    await sequelize.sync();
  });

  afterAll(async () => {
    // Close the database connection
    await sequelize.close();
  });

  it('should create a new user', () => {
    const user = User.build({
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
    // Build another user instance with the same username
    const newUser = User.build({
      user_email: 'test3@example.com',
      user_name: 'uniqueuser',
      user_pass: 'testpassword',
      is_deleted: 0,
    });

    // Validate the instance without saving it to the database
    try {
      await newUser.validate();
    } catch (error: any) {
      expect(error).toBeDefined();
      expect(error.name).toBe('SequelizeValidationError');
      expect(error.errors).toHaveLength(1);
      expect(error.errors[0].message).toBe('This username is already taken');
    }
  });

  // Add more test cases as needed
});
