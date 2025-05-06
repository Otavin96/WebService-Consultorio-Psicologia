import { Router } from "express";
import { CreateUserController } from "../controllers/create-user.controller";
import { GetUserController } from "../controllers/get-user.controller";
import { DeleteUserController } from "../controllers/delete-user.controller";
import { UpdateUserController } from "../controllers/update-user.controller";
import { AuthenticateUserController } from "../controllers/authenticate-user.controller";

const usersRouter = Router();

usersRouter.post("/", CreateUserController);
usersRouter.get("/:id", GetUserController);
usersRouter.delete("/:id", DeleteUserController);
usersRouter.put("/:id", UpdateUserController);
usersRouter.post("/authenticate/", AuthenticateUserController);

export { usersRouter };
