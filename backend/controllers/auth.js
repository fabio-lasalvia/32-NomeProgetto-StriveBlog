import { signJWT } from "../helpers/jwt.js";
import mailer from "../helpers/mailer.js";
import Author from "../models/Author.js";

/////////////////
///// LOGIN /////
/////////////////
export async function login(request, response, next) {
  try {
    const { email, password } = request.body;

    const userEmail = await Author.findOne({ email });

    if (!userEmail) {
      return response.status(404).json({ message: "Autore non trovato" });
    }

    const isMatch = await userEmail.comparePassword(password);
    if (isMatch) {
      const jwt = await signJWT({
        id: userEmail._id,
      });
      return response
        .status(200)
        .json({ message: "token generato con successo", token: jwt });
    }

    return response.status(400).json({ message: "Email o password errati" });
  } catch (error) {
    next(error);
  }
}

//////////////////
///// SIGNUP /////
//////////////////
export async function signup(request, response) {
  try {
    const { name, surname, email, password, dateOfBirth, avatar } =
      request.body;

    const existing = await Author.findOne({ email });
    if (existing) {
      return response.status(400).json({ message: "Email già registrata" });
    }

    const newAuthor = new Author({
      name,
      surname,
      email,
      password,
      dateOfBirth,
      avatar,
    });

    await newAuthor.save();

    await mailer.sendMail({
      to: email,
      subject: "Welcome to StriveBlog",
      html: `
            <h1>Welcome to StriveBlog</h1>

            <p>Ciao ${name} ${surname}, ti diamo il benvenuto su StriveBlog</p>
            `,

      from: "studio.fabio.lasalvia@gmail.com",
    });

    response
      .status(201)
      .json({ message: "Autore creato con successo", author: newAuthor });
  } catch (error) {
    response
      .status(500)
      .json({ message: "Errore durante la registrazione", error });
  }
}
