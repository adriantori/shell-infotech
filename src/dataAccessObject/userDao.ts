import { Sequelize } from "sequelize";
import User from "../models/userModel";

async function createUserDao( username: string, email: string, password: string): Promise<any> {
  try {
      const user = await User.create({
          user_name: username,
          user_email: email,
          user_pass: password,
      });

      return user;
  } catch (error: any) {
      throw new Error(error.message.replace('Validation error: ', ''));
  }
}


export { createUserDao }