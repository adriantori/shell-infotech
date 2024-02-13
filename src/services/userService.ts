import * as bcrypt from 'bcrypt';

import { createUserDao, deleteUserDao, getAllUserDao, getUserDao, undeleteUserDao, updateUserDao } from '../dataAccessObject/userDao';

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

async function updateUserService(username: string, email: string, password: string | undefined, userId: number) {
  try {
    let hashedPassword

    if (typeof password === 'string') {
      // Hash the password if it is provided
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const user = await updateUserDao(username, email, hashedPassword, userId);
    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

async function deleteUserService(userId: number) {
  try {

    const user = await deleteUserDao(userId);
    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

async function undeleteUserService(userId: number) {
  try {

    const user = await undeleteUserDao(userId);
    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
}


export { createUserService, getAllUserService, getUserService, updateUserService, deleteUserService, undeleteUserService }