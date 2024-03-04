import { Router } from "express";
import authMiddleware from "./src/aplication/config/middlewares/authMiddlewares";
import CreateUserController from "./src/aplication/createUser/index";
import AuthController from "./src/aplication/AuthController";

const router = Router();

router.post("/users", CreateUserController.execute);
router.post("/auth", AuthController.authenticate);
router.get("/users", authMiddleware, CreateUserController.authenticate);

export default router;
