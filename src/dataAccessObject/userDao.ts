import { Sequelize } from "sequelize";
import User from "../models/userModel";

async function createUserDao( username: string, email: string, password: string): Promise<any> {
    const currentDate = new Date();
  try {
      const user = await User.create({
          user_name: username,
          user_email: email,
          user_pass: password,
          createdAt: currentDate, 
          updatedAt: currentDate,
          is_deleted: 0
      });

      return user;
  } catch (error: any) {
      throw new Error(error.message.replace('Validation error: ', ''));
  }
}

async function getAllUserDao(): Promise<any> {
    const currentDate = new Date();
  try {
      const users = await User.findAll({
        where: {
            is_deleted: 0
        }
      });

      return users;
  } catch (error: any) {
      throw new Error(error.message.replace('Validation error: ', ''));
  }
}

async function getUserDao(userId: number): Promise<any> {
    const currentDate = new Date();
  try {
      const user = await User.findAll({
        where: {
            is_deleted: 0,
            user_id: userId
        }
      });

      return user;
  } catch (error: any) {
      throw new Error(error.message.replace('Validation error: ', ''));
  }
}


export { createUserDao, getAllUserDao, getUserDao }