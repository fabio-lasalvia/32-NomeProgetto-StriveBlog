import express from "express";
import { getAllComments, createComment, getSingleComment, updateComment, deleteComment} from "../controllers/comments.js";
import { authentication } from "../middlewares/auth/authentication.js";
// import { validatePost } from "../middlewares/middlewarePost_post.js";


const commentsRouter = express.Router();

///////////////////////////
///// Rotte Pubbliche /////
///////////////////////////
commentsRouter.get("/:id/comments", getAllComments)

commentsRouter.get("/:id/comments/:commentId", getSingleComment)


//////////////////////////
///// Rotte Protette /////
//////////////////////////
commentsRouter.post("/:id/comments", authentication, createComment)

commentsRouter.put("/:id/comments/:commentId", authentication,  updateComment)

commentsRouter.delete("/:id/comments/:commentId", authentication, deleteComment)

export default commentsRouter
