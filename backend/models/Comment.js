import mongoose, { Schema } from "mongoose";

const CommentSchema = new Schema(
  {
    text: { type: String, required: true },

    // referencing
    author: {
      type: Schema.Types.ObjectId,
      ref: "Author",
    },
  },
  { timestamps: true }
);

//-- non fare per gli Schema che bisogna embeddare, altrimenti mongoose crea la collection

//const Comment = mongoose.model("Comment", CommentSchema); 

export default CommentSchema;
