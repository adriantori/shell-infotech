import { Request, Response } from "express"

import { createUserService, deleteUserService, getAllUserService, getUserService, undeleteUserService, updateUserService } from "../services/userService";

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
  const { username, email, password } = req.body;
  const userId = parseInt(req.params.id);

  try {
    const user = await updateUserService(username, email, password, userId);

    if (user) {
      res.status(200).json({
        message: 'Update User success'
      });
    } else {
      res.status(200).json({
        message: 'ID does not exist'
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
}

async function deleteUserController(req: Request, res: Response) {
  const userId = parseInt(req.params.id);

  try {
    const user = await deleteUserService(userId);

    if (user) {
      res.status(200).json({
        message: 'Delete User success'
      });
    } else {
      res.status(200).json({
        message: 'ID does not exist'
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
}

async function undeleteUserController(req: Request, res: Response) {
  const userId = parseInt(req.params.id);

  try {
    const user = await undeleteUserService(userId);

    if (user) {
      res.status(200).json({
        message: 'Restore User success'
      });
    } else {
      res.status(200).json({
        message: 'ID does not exist'
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message
    });
  }
}

export { createUserController, getAllUserController, getUserByIdController, updateUserController, deleteUserController, undeleteUserController }