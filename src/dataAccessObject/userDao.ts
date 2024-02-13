import { UpdateOptions } from "sequelize";
import User from "../models/userModel";

async function createUserDao(username: string, email: string, password: string): Promise<any> {
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
    try {
        const users = await User.findAll({
            where: {
                is_deleted: 0
            },
            order: [
                ['user_id', 'ASC']
            ]
        });

        return users;
    } catch (error: any) {
        throw new Error(error.message.replace('Validation error: ', ''));
    }
}

async function getUserDao(userId: number): Promise<any> {
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

async function updateUserDao(username: string, email: string, password: string | undefined, userId: number): Promise<any> {
    const currentDate = new Date();
    try {
        const result = await User.update(
            {
              user_name: username,
              user_email: email,
              user_pass: password,
              updatedAt: currentDate,
            },
            {
              where: {
                is_deleted:  0,
                user_id: userId,
              },
              returning: true,
            }
          );
          
        if (result && Array.isArray(result) && result.length >  1 && result[1].length >  0) {
            const user = result[1][0];
            return user;
        } else {
            throw new Error('No user updated');
        }
    } catch (error: any) {
        throw new Error(error.message.replace('Validation error: ', ''));
    }
    
}

async function deleteUserDao(userId: number): Promise<any> {
  const currentDate = new Date();
  try {
    const [affectedRows] = await User.update(
      {
        is_deleted: 1,
        updatedAt: currentDate,
      },
      {
        where: {
          user_id: userId,
        },
        returning: true, // Include the updated rows in the result
      } as UpdateOptions
    );

    if (affectedRows > 0) {
      return { is_deleted: 1, updatedAt: currentDate }; // Adjust the return value as needed
    } else {
      throw new Error('No user deleted');
    }
  } catch (error: any) {
    throw new Error(error.message.replace('Validation error: ', ''));
  }
}

async function undeleteUserDao(userId: number): Promise<any> {
    const currentDate = new Date();
    try {
        const user = await User.update({
            is_deleted: 0,
            updatedAt: currentDate,
        },
            {
                where: {
                    user_id: userId
                }
            });

        return user;
    } catch (error: any) {
        throw new Error(error.message.replace('Validation error: ', ''));
    }
}


export { createUserDao, getAllUserDao, getUserDao, updateUserDao, deleteUserDao, undeleteUserDao }