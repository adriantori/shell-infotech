import { Router } from "express";
import cors from "cors";
import { createUserController, getAllUserController, getUserByIdController, updateUserController, deleteUserController } from "../controllers/userController";
import whitelist from "../middlewares/whitelist";


export const examRoute = Router();

// examRoute.options('/getAll', cors(whitelist.clientOptionsGlobal));

examRoute.post('/createUser', createUserController);
examRoute.get('/getAll', getAllUserController);
examRoute.get('/getId/:id', getUserByIdController);
examRoute.put('/updateUser/:id', updateUserController);
examRoute.delete('/deleteUser/:id', deleteUserController);