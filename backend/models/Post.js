import mongoose, { Schema } from "mongoose";
import CommentSchema from "./Comment.js";

const PostSchema = new Schema({
  category: { type: String, required: true },

  title: { type: String, required: true },

  cover: {
    type: String,
    default:
      "https://res.cloudinary.com/dbqckc5sl/image/upload/v1757097337/noImage_xp0alc.avif",
  },

  readTime: {
    value: { type: Number, required: true, min: 1 },
    unit: { type: String, default: "minute" },
  },

  //referencing
  author: {
    type: Schema.Types.ObjectId,
    ref: "Author",
  },

  content: { type: String, required: true },

  //embedding
  comments: [
    CommentSchema
  ],
});

const Post = mongoose.model("Post", PostSchema);

export default Post;
