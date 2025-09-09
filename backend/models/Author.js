import mongoose, { Schema } from "mongoose";
import validator from "validator";

const AuthorSchema = new Schema({
  name: { type: String, required: true, trim: true, minlength: 2, maxlength: 15 },

  surname: { type: String, required: true, trim: true, minlength: 2, maxlength: 15 },

  email: { type: String, required: true, unique: true, trim: true, lowercase: true, validate: [validator.isEmail, "Inserisci un'email valida"] },

  dateOfBirth: { type: String, required: true },

  avatar: { type: String },

  password:{type: String, select: false},

});

const Author = mongoose.model("Author", AuthorSchema);

export default Author;
