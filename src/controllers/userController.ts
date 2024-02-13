import { Request, Response } from "express"

import { createUserService, getAllUserService, getUserService } from "../services/userService";

async function createUserController(req: Request, res: Response) {
  const { username, email, password } = req.body;

  try {
    const user = await createUserService(username, email, password);

    if (user) {
      res.status(201).json({
        message: 'Create User success',
        data: user,
      });
    } else {
      res.status(409).json({
        message: 'Username already exist',
        data: user,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
}

async function getAllUserController(req: Request, res: Response) {
  try {
    const users = await getAllUserService();
    res.status(200).json({
      message: 'Users retrieved successfully',
      data: users,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
}

async function getUserByIdController(req: Request, res: Response) {
  const userId = req.params.id
  try {
    const user = await getUserService(parseInt(userId));
    console.log(user.length)
    if (user.length > 0) {
      res.status(200).json({
        message: 'User retrieved successfully',
        data: user,
      });
    } else {
      res.status(200).json({
        message: 'User does not exist'
      });
    };
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
}

async function updateUserController(req: Request, res: Response) {
  res.send(`update ${req.params.id}`)
}

async function deleteUserController(req: Request, res: Response) {
  res.send(`delete ${req.params.id}`)
}

export { createUserController, getAllUserController, getUserByIdController, updateUserController, deleteUserController }