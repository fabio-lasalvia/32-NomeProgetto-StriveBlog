import express from "express";
import "dotenv/config"; //importa il contenuto del file .env
import cors from "cors"; //permette di gestire il CORS (chiamate da frontend su indirizzi diversi da quello del backend)

import { connectDB } from "./db.js";
import authorsRouter from "./routes/authors.js";

const server = express();
const port = process.env.PORT;

server.use(cors());
server.use(express.json());
server.use("/authors", authorsRouter);
server.use("/posts", postsRouter);

connectDB();
server.listen(port, () => console.log(`Server avviato sulla porta ${port}`));
