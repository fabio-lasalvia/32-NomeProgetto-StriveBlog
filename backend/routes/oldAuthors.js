import Express from "express";
import Author from "../models/OldAuthor.js";

const router = Express.Router();

//////////////////////////////////
///// GET - TUTTI GLI AUTORI /////
//////////////////////////////////
router.get("/", async (request, response) => {
  try {
    const authors = await Author.find();

    response.json(authors);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

////////////////////////////////
///// GET - SINGOLO AUTORE /////
////////////////////////////////
router.get("/:id", async (request, response) => {
  try {
    const authorId = request.params.id;
    const author = await Author.findById(authorId);
    if (author) {
      response.json(author);
    } else {
      response.status(404).json({ message: "Author not found" });
    }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

/////////////////////////////////
///// POST - SINGOLO AUTORE /////
/////////////////////////////////
router.post("/", async (request, response) => {
  try {
    const newAuthor = new Author(request.body);
    const savedAuthor = await newAuthor.save();
    if (savedAuthor) {
      response.status(201).json({ message: "Author created" });
    } else {
      response.status(400).json({ message: "Error" });
    }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

////////////////////////////////
///// PUT - SINGOLO AUTORE /////
////////////////////////////////
router.put("/:id", async (request, response) => {
  try {
    const authorId = request.params.id;
    const author = await Author.findById(authorId);
    if (author) {
      const authorUpdated = await Author.findByIdAndUpdate(
        authorId,
        request.body,
        { new: true, runValidators: true }
        // new: true - restituisce il documento aggiornato
        // runValidators: true - Mongoose applica le regole dello schema (required, type, ecc.)
      );
      response
        .status(200)
        .json({ message: "Author updated", author: authorUpdated });
    } else {
      response.status(404).json({ message: "Author not found" });
    }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

///////////////////////////////////
///// DELETE - SINGOLO AUTORE /////
///////////////////////////////////
router.delete("/:id", async (request, response) => {
  try {
    const authorId = request.params.id;
    const author = await Author.findById(authorId);
    if (author) {
      const authorDeleted = await Author.findByIdAndDelete(authorId);
      response.status(200).json({ message: "Author deleted", author: authorDeleted });
    } else {
      response.status(404).json({ message: "Author not found" });
    }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

export default router;
