import express from "express";
import { create, getOne, getAll, put, remove, addAvatar, getAuthorPosts, getMe, updateBio } from "../controllers/authors.js";
import {uploadCloudinary} from "../middlewares/uploadCloudinary.js";
import { authentication } from "../middlewares/auth/authentication.js";

const authorsRouter = express.Router();

////////////////////////////////
///// Rotta Protetta - /ME /////
////////////////////////////////
authorsRouter.get("/me", authentication, getMe)

///////////////////////////
///// Rotte Pubbliche /////
///////////////////////////
authorsRouter.get("/", getAll);

authorsRouter.get("/:id", getOne);

authorsRouter.get("/:id/posts", getAuthorPosts)

authorsRouter.post("/", create);


//////////////////////////
///// Rotte Protette /////
//////////////////////////
authorsRouter.put("/:id", authentication, put);

authorsRouter.patch("/:id/bio", authentication, updateBio);

authorsRouter.patch('/:id/avatar', authentication, uploadCloudinary.single('avatar'), addAvatar)

authorsRouter.delete("/:id", authentication, remove);

export default authorsRouter;
