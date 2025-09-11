import { Router } from "express";
import { create } from "../controllers/authors.js";

const userRouter = Router();

userRouter.post("/register", create);

userRouter.post("/verify", create);

userRouter.post('/login')

export default userRouter;
