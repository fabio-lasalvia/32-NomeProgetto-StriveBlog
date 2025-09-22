import mongoose from "mongoose";
import Post from "../models/Post.js";
import mailer from "../helpers/mailer.js";

//////////////////////////////
///// GET - TUTTI I POST /////
//////////////////////////////
export async function getAll(request, response, next) {
  try {
    const { title } = request.query;
    const filter = {};
    if (title) {
      filter.title = { $regex: title, $options: "i" };
    }

    const posts = await Post.find(filter).populate(
      "author",
      "name email avatar"
    );

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
      return response.status(401).json({ message: "Authentication required" });
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
    try {
      await mailer.sendMail({
        to: request.author.email,
        subject: "New Post Created!",
        html: `
        <h1>Your Post Has Been Published!</h1>

        <p>Hi ${request.author.name} ${request.author.surname},</p>

        <p>Thank you for creating a new post on StriveBlog! 🎉</p>

        <p>You can visit your <a href="https://striveblog.com/profile">profile</a> 
        to manage your content or explore the latest posts from the community.</p>

        <p>Keep writing and inspiring!<br/>
        — The StriveBlog Team</p>
      `,
        from: "studio.fabio.lasalvia@gmail.com",
      });
    } catch (error) {
      console.error("Mail non inviata:", error.message);
    }

    response.status(201).json(postSaved);
  } catch (error) {
    if (error.code === 11000) {
      return response.status(400).json({ message: "Duplicate field error" });
    }
    next(error);
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
