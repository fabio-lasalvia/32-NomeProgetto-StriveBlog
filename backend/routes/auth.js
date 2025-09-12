import express from "express";

import { login } from "../controllers/auth.js";

const authRouter = express.Router();

authRouter.post("/register", login);


export default authRouter;
