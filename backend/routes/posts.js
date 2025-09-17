import express from "express";
import { create, getOne, getAll, put, remove, addCover } from "../controllers/posts.js";

import { validateId } from "../middlewares/middlewareId.js";

import uploadCloudinary from "../middlewares/uploadCloudinary.js";
import { authentication } from "../middlewares/auth/authentication.js";

import { validatePostId } from "../middlewares/posts/validatePostId.js";
import { validatePost } from "../middlewares/middlewarePost_post.js";

const postsRouter = express.Router();

///////////////////////////
///// Rotte Pubbliche /////
///////////////////////////
postsRouter.get("/", getAll);

postsRouter.get("/:id", validatePostId, getOne);


//////////////////////////
///// Rotte Protette /////
//////////////////////////
postsRouter.post("/", authentication, uploadCloudinary.single("cover"), validatePost, create);

postsRouter.put("/:id", authentication, validatePostId, validatePost, put);

postsRouter.patch("/:id/cover", authentication, validatePostId, uploadCloudinary.single("cover"), addCover);

postsRouter.delete("/:id", authentication, validatePostId, remove);

export default postsRouter;
