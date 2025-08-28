import express from "express";
import { create, getOne, getAll, put, remove } from "../controllers/authors.js";

const authorsRouter = express.Router();

authorsRouter.get("/", getAll);

authorsRouter.post("/", create);

authorsRouter.get("/:id", getOne);

authorsRouter.put("/:id", put);

authorsRouter.delete("/:id", remove);

export default authorsRouter;
