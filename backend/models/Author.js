import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt'

const AuthorSchema = new Schema({
  name: { type: String, required: true, trim: true, minlength: 2, maxlength: 15 },

  surname: { type: String, required: true, trim: true, minlength: 2, maxlength: 15 },

  email: { type: String, required: true, unique: true, trim: true, lowercase: true, validate: [validator.isEmail, "Inserisci un'email valida"] },

  dateOfBirth: { type: String },

  avatar: { type: String },

  password: { type: String, minlength: 6 },

  googleId: { type: String },

});

AuthorSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});


AuthorSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password)
}

const Author = mongoose.model("Author", AuthorSchema);

export default Author;
