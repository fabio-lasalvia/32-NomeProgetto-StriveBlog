import bcrypt from "bcrypt";
import Author from "../models/Author.js";
import errorHandler from "../middlewares/errorHandler.js";
import mailer from "../helpers/mailer.js";
import { htmlToText } from "html-to-text";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { generateJWT } from "../helpers/jwt.js";

/////////////////////////////////////////
///// POST - CREAZIONE NUOVO AUTORE /////
/////////////////////////////////////////
export async function create(request, response, next) {
  try {
    const body = request.body;

    // verificare se l'utente esiste già
    const user = await Author.findOne({ email: body.email.toLowerCase() });
    if (user) return next(errorHandler.Conflict("Email già registrata"));

    // hashare la password
    const hash = await bcrypt.hash(body.password, 12);

    const newAuthor = await Author.create({
      ...body,
      password: hash,
    });

    response.status(201).json({ message: "Success, you can logIn now" });

    const htmlContent = "Benvenuto in Strive Blog";

    await mailer.sendMail({
      from: {
        name: "StriveBlog",
        address: "admin@striveblog.it",
      },
      to: newAuthor.email,
      subject: "Benvenuto",
      text: htmlToText(htmlContent),
      html: htmlContent,
    });
  } catch (error) {
    next(errorHandler);
  }
}

/////////////////
///// LOGIN /////
/////////////////
export async function createLogin(request, response, next) {
  try {
    const { email, password } = request.body;

    // Trova l'utente
    const user = await Author.findOne({ email: email.toLowerCase() });
    if (!user) {
      return next(createHttpError.Unauthorized("Credenziali errate"));
    }

    // Confronta la password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(createHttpError.Unauthorized("Credenziali errate"));
    }

    // Genera il token JWT
    const token = await generateJWT({ userId: user._id });

    response.status(200).json({
      message: "Login effettuato con successo",
      token,
    });
  } catch (error) {
    next(errorHandler);
  }
}
