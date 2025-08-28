import express from "express";
import { create, getOne, getAll, put, remove } from "../controllers/posts.js";

const postsRouter = express.Router();

postsRouter.get("/", getAll)

postsRouter.post("/", create)

postsRouter.get("/:id", getOne)

postsRouter.put("/:id", put)

postsRouter.delete("/:id", remove)

export default postsRouter
