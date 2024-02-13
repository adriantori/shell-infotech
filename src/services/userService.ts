import bcrypt from 'bcrypt';

import { createUserDao, getAllUserDao, getUserDao } from '../dataAccessObject/userDao';

async function createUserService(username: string, email: string, password: string) {
  try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await createUserDao(username, email, hashedPassword);
      return user;
  } catch (error: any) {
      throw new Error(error.message);
  }
}

async function getAllUserService() {
  try {

      const users = await getAllUserDao();
      return users;
  } catch (error: any) {
      throw new Error(error.message);
  }
}

async function getUserService(userId: number) {
  try {

      const user = await getUserDao(userId);
      return user;
  } catch (error: any) {
      throw new Error(error.message);
  }
}

export { createUserService, getAllUserService, getUserService }