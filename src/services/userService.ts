import bcrypt from 'bcrypt';

import { createUserDao } from '../dataAccessObject/userDao';

async function createUserService(username: string, email: string, password: string) {
  try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await createUserDao(username, email, hashedPassword);
      return user;
  } catch (error: any) {
      throw new Error(error.message);
  }
}

export { createUserService }