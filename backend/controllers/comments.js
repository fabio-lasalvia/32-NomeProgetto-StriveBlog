import mongoose from "mongoose";

//////////////////////////////////
///// GET - TUTTI I COMMENTI /////
//////////////////////////////////
import Post from "../models/Post.js";
import { json } from "express";
import Author from "../models/Author.js";

export async function getAllComments(request, response) {
  const { id } = request.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).json({ message: "ID non valido" });
  }
  const post = await Post.findById(id);
  if (!post) {
    return response.status(404).json({ message: "Post non trovato" });
  }
  response.status(200).json(post.comments);
}

//////////////////////////////////
///// POST - SINGOLO COMMENTO/////
//////////////////////////////////
export async function createComment(request, response) {
  const { text, author } = request.body;
  const { id } = request.params;
  if (!mongoose.Types.ObjectId.isValid(author)) {
    return response.status(400).json({ message: "Author con id non valido" });
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).json({ message: "ID non valido" });
  }

  const authorDB = await Author.findById(author);
  if (!authorDB) {
    return response.status(404).json({ message: "Autore non trovato" });
  }

  const post = await Post.findById(id);
  if (!post) {
    return response.status(404).json({ message: "Post non trovato" });
  }

  const newComment = { text, author };
  post.comments.push(newComment);
  await post.save();

  response.status(201).json(newComment);
}

/////////////////////////////////
///// GET - SINGOLO COMMENTO/////
/////////////////////////////////
export async function getSingleComment(request, response) {
  const { id, commentId } = request.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).json({ message: "ID non valido" });
  }
  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    return response.status(400).json({ message: "ID non valido" });
  }
  const post = await Post.findById(id);
  if (!post) {
    return response.status(404).json({ message: "Post non trovato" });
  }
  const comment = post.comments.find((comment) => comment._id == commentId);
  if (!comment) {
    return response.status(404).json({ message: "Commento non trovato" });
  }
  response.status(200).json(comment);
}

/////////////////////////////////
///// PUT - SINGOLO COMMENTO/////
/////////////////////////////////
export async function updateComment(request, response) {
  const { id, commentId } = request.params;
  const { text, author } = request.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).json({ message: "ID non valido" });
  }
  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    return response.status(400).json({ message: "ID non valido" });
  }
  if (!mongoose.Types.ObjectId.isValid(author)) {
    return response.status(400).json({ message: "Autore non valido" });
  }

  const authorDB = await Author.findById(author);
  if (!authorDB) {
    return response.status(404).json({ message: "Autore non trovato" });
  }

  const post = await Post.findById(id);
  if (!post) {
    return response.status(404).json({ message: "Post non trovato" });
  }

//   let comment = post.comments.find((comment) => comment._id == commentId);
//   if (!comment) {
//     return response.status(404).json({ message: "Commento non trovato" });
//   }

//   comment = {
//      commentId,
//      text,
//      author,
//    };
// console.log(comment)
   //await post.save();

   const commentIndex = post.comments.findIndex(comment => comment._id == commentId)

   if(commentIndex === -1){
    return response.status(404).json({ message: "Commento non trovato" });
   }

   post.comments[commentIndex] = {
    ...post.comments[commentIndex],
    text,
    author
   }

   await post.save();



  response.status(200).json(post.comments[commentIndex]);
}

////////////////////////////////////
///// DELETE - SINGOLO COMMENTO/////
////////////////////////////////////
export async function deleteComment(request, response) {
  const { id, commentId } = request.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).json({ message: "ID non valido" });
  }
  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    return response.status(400).json({ message: "ID non valido" });
  }

  const post = await Post.findById(id);
  if (!post) {
    return response.status(404).json({ message: "Post non trovato" });
  }
  console.log(post.comments);
  const comment = post.comments.find((comment) => comment._id == commentId);
  if (!comment) {
    return response.status(404).json("Commento non trovato");
  }

  post.comments = post.comments.filter((comment) => comment._id != commentId);

  await post.save();

  return response.status(200).json(comment);
}

