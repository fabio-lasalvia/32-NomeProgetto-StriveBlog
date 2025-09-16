import mongoose from "mongoose";
import Author from "../models/Author.js";

//////////////////////////////////
///// GET - TUTTI GLI AUTORI /////
//////////////////////////////////
export async function getAll(request, response) {
  try {
    const authors = await Author.find();
    response.status(200).json(authors);
  } catch (error) {
    response
      .status(500)
      .json({ message: "Errore nel recupero degli autori", error });
  }
}

/////////////////////////////////////////
///// POST - CREAZIONE DEGLI AUTORI /////
/////////////////////////////////////////
export async function create(request, response) {
  try {
    const { name, surname, email, dateOfBirth, avatar, password } = request.body;
    if (!name || !surname || !email || !dateOfBirth) {
      return response.status(400).json({
        message:
          "I campi nome, cognome, email e data di nascita sono obbligatori",
      });
    }
    const newAuthor = new Author({
      name,
      surname,
      email,
      dateOfBirth,
      avatar,
      password: password || undefined,
    });
    const authorSaved = await newAuthor.save();
    response.status(201).json(authorSaved);
  } catch (error) {
    if (error.code === 11000) {
      return response.status(400).json({ message: "Email già esistente" });
    }
    response
      .status(500)
      .json({ message: "Errore nella creazione dell'autore", error });
  }
}

////////////////////////////////
///// GET - SINGOLO AUTORE /////
////////////////////////////////
export async function getOne(request, response) {
  try {
    const { id } = request.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({ message: "ID non valido" });
    }
    const author = await Author.findById(id);
    if (!author) {
      return response.status(404).json({ message: "Autore non trovato" });
    }
    response.status(200).json(author);
  } catch (error) {
    response
      .status(500)
      .json({ message: "Errore nel recupero del singolo autore", error });
  }
}

////////////////////////////////
///// PUT - SINGOLO AUTORE /////
////////////////////////////////
export async function put(request, response) {
  try {
    const { id } = request.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({ message: "ID non valido" });
    }
    const { nome, cognome, email, dataDiNascita, avatar } = request.body;
    if (!nome || !cognome || !email || !dataDiNascita) {
      return response.status(400).json({
        message:
          "I campi nome, cognome, email e data di nascita sono obbligatori",
      });
    }
    const updatedAuthor = await Author.findByIdAndUpdate(
      id,
      {
        nome,
        cognome,
        email,
        dataDiNascita,
        avatar,
      },
      { new: true }
    );
    if (!updatedAuthor) {
      return response.status(404).json({ message: "Autore non trovato" });
    }
    response.status(200).json(updatedAuthor);
  } catch (error) {
    response
      .status(500)
      .json({ message: "Errore nell'aggiornamento del singolo autore", error });
  }
}

///////////////////////////////////
///// DELETE - SINGOLO AUTORE /////
///////////////////////////////////
export async function remove(request, response) {
  try {
    const { id } = request.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({ message: "ID non valido" });
    }
    const deletedAuthor = await Author.findByIdAndDelete(id);
    if (!deletedAuthor) {
      return response.status(404).json({ message: "Autore non trovato" });
    }
    response.status(200).json(deletedAuthor);
  } catch (error) {
    response
      .status(500)
      .json({ message: "Errore nell'eliminazione del singolo autore", error });
  }
}

//////////////////////////////////
///// PATCH - SINGOLO AUTORE /////
/////////////////////////////////
export async function addAvatar(request, response) {
  try {
    const filePath = request.file.path;
    const { id } = request.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({ message: "ID non valido" });
    }
    const author = await Author.findByIdAndUpdate(id, { avatar: filePath }, { new: true })
    if (!author) {
      return response.status(400)
    }
    return response.status(200).json(author)
  } catch (error) {
    next(error);
  }
}