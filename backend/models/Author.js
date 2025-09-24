import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcrypt from 'bcrypt'

const AuthorSchema = new Schema({
  name: { type: String, required: true, trim: true, minlength: 2, maxlength: 50 },

  surname: { type: String, trim: true, maxlength: 50 },

  email: { type: String, required: true, unique: true, trim: true, lowercase: true, validate: [validator.isEmail, "Inserisci un'email valida"] },

  dateOfBirth: { type: String },

  avatar: {
    type: String,
    default:
      "https://res.cloudinary.com/dbqckc5sl/image/upload/v1757097337/noImage_xp0alc.avif",
  },

  password: { type: String, minlength: 6 },

  googleId: { type: String },

  OTP: {type: String},

  bio: { type: String, maxlength: 500, default: "" },

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
