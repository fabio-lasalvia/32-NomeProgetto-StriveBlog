import express from "express";
import { create, getOne, getAll, put, remove, addCover } from "../controllers/posts.js";

import { validatePost } from "../middlewares/middlewarePost_post.js";
import { validateId } from "../middlewares/middlewareId.js";

import uploadCloudinary from "../middlewares/uploadCloudinary.js";

const postsRouter = express.Router();

postsRouter.get("/", getAll);

postsRouter.post("/", validatePost, create);

postsRouter.get("/:id", validateId, getOne);

postsRouter.put("/:id", validateId, validatePost, put);

postsRouter.patch("/:id/cover", validateId, uploadCloudinary.single("cover"), addCover);

postsRouter.delete("/:id", validateId, remove);

export default postsRouter;
