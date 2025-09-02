import mongoose, { Schema } from "mongoose";
import validator from "validator";

const AuthorSchema = new Schema({
  nome: { type: String, required: true, trim: true, minlength: 2, maxlength: 15 },
  cognome: { type: String, required: true, trim: true, minlength: 2, maxlength: 15 },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true, validate: [validator.isEmail, "Inserisci un'email valida"] },
  dataDiNascita: { type: String, required: true },
  avatar: { type: String },
});

const Author = mongoose.model("Author", AuthorSchema);

export default Author;
