import express from "express";
import uploadCloudinary from "../middlewares/uploadCloudinary.js";
import { uploadImage } from "../controllers/imagesController.js";

const imagesRouter = express.Router();

imagesRouter.patch("/post/:id", uploadCloudinary.single("post"), uploadImage);

export default imagesRouter;
