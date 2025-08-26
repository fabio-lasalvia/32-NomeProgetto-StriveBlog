// mongoose è la libreria che fa da "ponte" tra Node.js e MongoDB
import mongoose from "mongoose";

const { Schema, model } = mongoose;
// Schema - serve per definire la forma dei documenti (le “colonne” dell'autore)
// model - serve per creare un oggetto che servirà nel codice per fare query (Author.find(), Author.create(), ecc)

// {
//   "_id",
//   "email",
//   "password",
//   "tokenGoogle",
//   "firstName",
//   "lastName",
//   "birthDate",
//   "avatar"
// }

const AuthorSchema = new Schema({
  //id:{generato dal DB}
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tokenGoogle: { type: String, required: false },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthDate: { type: Date, required: true },
  avatar: { type: String, required: false },
});
// AuthorSchema è la struttura dell'autore

// type - dice se il tipo di dato è: String, Date, Number, ecc

// required: true - obbligatorio, se manca darà errore

// unique: true - nessun altro autore può avere lo stesso valore in quel campo

export default model("Author", AuthorSchema);
// model("Author", AuthorSchema) - crea il modello chiamato "Author", basato sullo schema AuthorSchema

// Questo modello è l'oggetto che servirà nel codice per interagire con la collezione authors su MongoDB
