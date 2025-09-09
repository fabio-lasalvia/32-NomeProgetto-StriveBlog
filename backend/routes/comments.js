import express from "express";
import { getAllComments, createComment, getSingleComment, updateComment, deleteComment} from "../controllers/comments.js";
// import { validatePost } from "../middlewares/middlewarePost_post.js";


const commentsRouter = express.Router();

commentsRouter.get("/:id/comments", getAllComments)

commentsRouter.post("/:id/comments", createComment)

commentsRouter.get("/:id/comments/:commentId", getSingleComment)

commentsRouter.put("/:id/comments/:commentId",  updateComment)

commentsRouter.delete("/:id/comments/:commentId", deleteComment)

export default commentsRouter
