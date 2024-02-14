import { Router } from "express";
import cors from "cors";
import { createUserController, getAllUserController, getUserByIdController, updateUserController, deleteUserController, undeleteUserController } from "../controllers/userController";
import whitelist from "../middlewares/whitelist";


export const examRoute = Router();
examRoute.post('/createUser', cors(whitelist.clientOptionsGlobal));
examRoute.get('/getAll', cors(whitelist.clientOptionsGlobal));
examRoute.get('/getId/:id', cors(whitelist.clientOptionsGlobal));
examRoute.patch('/updateUser/:id', cors(whitelist.clientOptionsGlobal));
examRoute.delete('/deleteUser/:id', cors(whitelist.clientOptionsGlobal));
examRoute.patch('/undeleteUser/:id', cors(whitelist.clientOptionsGlobal));

examRoute.post('/createUser', cors(whitelist.clientOptionsGlobal), createUserController);
examRoute.get('/getAll', cors(whitelist.clientOptionsGlobal), getAllUserController);
examRoute.get('/getId/:id', cors(whitelist.clientOptionsGlobal), getUserByIdController);
examRoute.patch('/updateUser/:id', cors(whitelist.clientOptionsGlobal), updateUserController);
examRoute.delete('/deleteUser/:id', cors(whitelist.clientOptionsGlobal), deleteUserController);
examRoute.patch('/undeleteUser/:id', cors(whitelist.clientOptionsGlobal), undeleteUserController);