import mongoose, { Schema } from "mongoose";

const PostSchema = new Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  cover: { type: String, required: true },
  readTime: {
    value: { type: Number, required: true },
    unit: { type: String, default: "minute" },
  },
  author: { type: String, required: true },
  content: { type: String, required: true },
});

const Post = mongoose.model("Post", PostSchema);

export default Post;
