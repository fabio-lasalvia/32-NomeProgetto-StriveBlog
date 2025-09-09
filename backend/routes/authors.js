import express from "express";
import { create, getOne, getAll, put, remove, addAvatar } from "../controllers/authors.js";
import uploadCloudinary from "../middlewares/uploadCloudinary.js";

const authorsRouter = express.Router();

authorsRouter.get("/", getAll);

authorsRouter.post("/", create);

authorsRouter.get("/:id", getOne);

authorsRouter.put("/:id", put);

authorsRouter.patch('/:id/avatar', uploadCloudinary.single('avatar'), addAvatar)

authorsRouter.delete("/:id", remove);

export default authorsRouter;
