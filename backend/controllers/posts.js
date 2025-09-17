import mongoose from "mongoose";
import Post from "../models/Post.js";

//////////////////////////////
///// GET - TUTTI I POST /////
//////////////////////////////
export async function getAll(request, response, next) {
  try {
    const posts = await Post.find().populate("author", "name email avatar");
    response.status(200).json(posts);
  } catch (error) {
    next(error);
  }
}

/////////////////////////////////////
///// POST - CREAZIONE DEI POST /////
/////////////////////////////////////
export async function create(request, response, next) {
  try {
    const { category, title, readTime, content } = request.body;

    if (!request.author) {
      return response.status(401).json({ message: "Autenticazione mancante" });
    }

    const cover = request.file ? request.file.path : undefined;

    const newPost = new Post({
      category,
      title,
      cover,
      readTime,
      author: request.author._id,
      content,
    });

    const postSaved = await newPost.save();
    response.status(201).json(postSaved);
  } catch (error) {
    if (error.code === 11000) {
      return response.status(400).json({ message: "Duplicate field error" });
    }
    response.status(500).json({ message: "Error creating post", error });
  }
}

//////////////////////////////
///// GET - SINGOLO POST /////
//////////////////////////////
export async function getOne(request, response, next) {
  try {
    const post = await Post.findById(request.post._id).populate(
      "author",
      "name email avatar"
    );
    response.status(200).json(post);
  } catch (error) {
    next(error);
  }
}

//////////////////////////////
///// PUT - SINGOLO POST /////
//////////////////////////////
export async function put(request, response, next) {
  try {
    const { category, title, cover, readTime, content } = request.body;
    const post = request.post;

    post.category = category;
    post.title = title;
    post.cover = cover;
    post.readTime = readTime;
    post.content = content;

    await post.save();
    response.status(200).json(post);
  } catch (error) {
    next(error);
  }
}

/////////////////////////////////
///// DELETE - SINGOLO POST /////
/////////////////////////////////
export async function remove(request, response, next) {
  try {
    const post = request.post;
    await post.deleteOne();
    response.status(200).json(post);
  } catch (error) {
    next(error);
  }
}

////////////////////////////////
///// PATCH - SINGOLO POST /////
////////////////////////////////
export async function addCover(request, response, next) {
  try {
    const post = request.post;
    post.cover = request.file.path;
    await post.save();
    response.status(200).json(post);
  } catch (error) {
    next(error);
  }
}
