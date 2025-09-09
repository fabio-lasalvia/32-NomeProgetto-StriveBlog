import express from "express";
import { create, getOne, getAll, put, remove, addCover } from "../controllers/posts.js";
import { validatePost } from "../middlewares/middlewarePost_post.js";
import uploadCloudinary from "../middlewares/uploadCloudinary.js";

const postsRouter = express.Router();

postsRouter.get("/", getAll)

postsRouter.post("/", validatePost, create)

postsRouter.get("/:id", getOne)

postsRouter.put("/:id", validatePost, put)

postsRouter.patch('/:id/cover', uploadCloudinary.single('cover'), addCover)

postsRouter.delete("/:id", remove)

export default postsRouter
