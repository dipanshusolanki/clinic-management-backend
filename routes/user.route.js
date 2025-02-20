import {Router} from "express";
import {getUser, verifyUser} from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get('/:id', authMiddleware, getUser);

userRouter.post('/:id/verify-user', authMiddleware, verifyUser)

export default userRouter;
