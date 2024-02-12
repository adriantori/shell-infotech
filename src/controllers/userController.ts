import { Request, Response } from "express"

async function createUser(req: Request, res: Response) {
  console.log('create')
}

async function getAllUser(req: Request, res: Response) {
  console.log('get all')
}

async function getUserById(req: Request, res: Response) {
  console.log('get id')
}

async function updateUser(req: Request, res: Response) {
  console.log('update')
}

async function deleteUser(req: Request, res: Response) {
  console.log('delete')
}

export { createUser, getAllUser, getUserById, updateUser, deleteUser }