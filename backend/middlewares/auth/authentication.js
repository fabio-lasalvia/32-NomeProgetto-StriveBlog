import { verifyJWT } from "../helpers/jwt.js";
import Author from "../models/Author.js";

export async function authentication(request, response, next) {
  const headerAuth = request.headers.authorization || "";

  const token = headerAuth.replace("Bearer ", "");

  if (!token) {
    return response.status(401).json({ message: "Token mancante" });
  }

  try {
    const payload = verifyJWT(token);

    const author = await Author.findById(payload.id);

    if (!author) {
      return response.status(401).json({ message: "Utente non verificato" });
    }

    request.author = author;

    next();
  } catch (error) {
    return response.status(401).json({ message: "Token scaduto o non valido" });
  }
}
