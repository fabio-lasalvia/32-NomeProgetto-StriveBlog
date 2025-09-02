import express from "express";
import { create, getOne, getAll, put, remove } from "../controllers/posts.js";
import { validatePost } from "../middlewares/middlewarePost_post.js";

const postsRouter = express.Router();

postsRouter.get("/", getAll)

postsRouter.post("/", validatePost, create)

postsRouter.get("/:id", getOne)

postsRouter.put("/:id", validatePost, put)

postsRouter.delete("/:id", remove)

export default postsRouter
