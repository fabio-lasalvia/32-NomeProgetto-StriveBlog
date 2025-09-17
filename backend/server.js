import express from "express";
import "dotenv/config"; //importa il contenuto del file .env
import cors from "cors"; //permette di gestire il CORS (chiamate da frontend su indirizzi diversi da quello del backend)
import morgan from "morgan";

import errorHandler from "./middlewares/errorHandler.js";
import { authentication } from "./middlewares/auth/authentication.js";

import { connectDB } from "./db.js";

import googleStrategy from "./config/passport.config.js";

import authRouter from "./routes/auth.js";
import authorsRouter from "./routes/authors.js";
import postsRouter from "./routes/posts.js";
import commentsRouter from "./routes/comments.js";
import passport from "passport";


const server = express();
const port = process.env.PORT;

server.use(cors());
server.use(morgan("tiny"));
server.use(express.json());
server.use(errorHandler);

passport.use(googleStrategy)

server.use('/auth', authRouter)
server.use("/authors", authentication, authorsRouter);
server.use("/posts", postsRouter);
server.use("/posts", authentication, commentsRouter)

connectDB();
server.listen(port, () => console.log(`Server avviato sulla porta ${port}`));

//client <---> middleware <---> server
//controlli xss nel frontend (quando viene restituito dal backend)
