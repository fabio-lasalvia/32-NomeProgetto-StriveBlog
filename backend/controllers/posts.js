import mongoose from "mongoose";
import Post from "../models/Post.js";

//////////////////////////////
///// GET - TUTTI I POST /////
//////////////////////////////
export async function getAll(request, response) {
  try {
    const posts = await Post.find();
    response.status(200).json(posts);
  } catch (error) {
    response
      .status(500)
      .json({ message: "Errore nel recupero dei post", error });
  }
}

/////////////////////////////////////
///// POST - CREAZIONE DEI POST /////
/////////////////////////////////////
export async function create(request, response) {
  try {
    const { category, title, cover, readTime, author, content } = request.body;

    const newPost = new Post({
      category,
      title,
      cover,
      readTime,
      author,
      content,
    });
    const postSaved = await newPost.save();
    response.status(201).json(postSaved);
  } catch (error) {
    if (error.code === 11000) {
      return response.status(400).json({ message: "Email già esistente" });
    }
    response
      .status(500)
      .json({ message: "Errore nella creazione dell'autore", error });
  }
}

//////////////////////////////
///// GET - SINGOLO POST /////
//////////////////////////////
export async function getOne(request, response) {
  try {
    const { id } = request.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({ message: "ID non valido" });
    }
    const post = await Post.findById(id);
    if (!post) {
      return response.status(404).json({ message: "Post non trovato" });
    }
    response.status(200).json(post);
  } catch (error) {
    response
      .status(500)
      .json({ message: "Errore nel recupero del singolo post", error });
  }
}

//////////////////////////////
///// PUT - SINGOLO POST /////
//////////////////////////////
export async function put(request, response) {
  try {
    const { id } = request.params;
    const { category, title, cover, readTime, author, content } = request.body;

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { category, title, cover, readTime, author, content },
      { new: true, runValidators: true } // runValidators verifica che venga rispettato lo schema
    );

    if (!updatedPost) {
      return response.status(404).json({ message: "Post non trovato" });
    }

    return response.status(200).json(updatedPost);
  } catch (error) {
    return response.status(500).json({
      message: "Errore nell'aggiornamento del singolo post",
      error,
    });
  }
}

/////////////////////////////////
///// DELETE - SINGOLO POST /////
/////////////////////////////////
export async function remove(request, response) {
  try {
    const { id } = request.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({ message: "ID non valido" });
    }
    const deletedPost = await Post.FindByIdAndDelete(id);
    if (!deletedPost) {
      return response.status(404).json({ message: "Post non trovato" });
    }
    response.status(200).json(deletedPost);
  } catch (error) {
    response
      .status(500)
      .json({ message: "Errore nell'eliminazione del singolo post", error });
  }
}
