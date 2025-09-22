import express from "express";
import { create, getOne, getAll, put, remove, addCover } from "../controllers/posts.js";

import uploadCloudinary from "../middlewares/uploadCloudinary.js";
import { authentication } from "../middlewares/auth/authentication.js";

import { validatePostId } from "../middlewares/posts/validatePostId.js";
import { validatePost } from "../middlewares/middlewarePost_post.js";
import { authPostOwner } from "../middlewares/posts/authPostOwner.js";

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

postsRouter.put("/:id", authentication, validatePostId, authPostOwner, validatePost, put);

postsRouter.patch("/:id/cover", authentication, validatePostId, authPostOwner, uploadCloudinary.single("cover"), addCover);

postsRouter.delete("/:id", authentication, validatePostId, authPostOwner, remove);

export default postsRouter;
