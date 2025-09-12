import createHttpError from "http-errors";
import errorHandler from "./errorHandler.js";
import { verifyJWT } from "../helpers/oldJwt.js";
import Author from "../models/Author.js";

async function authentication(request, response, next) {
  if (!request.headers.authorization)
    return next(createHttpError.Unauthorized());

  const parts = request.headers.authorization.split(" ");
  if (parts.length != 2) return next(createHttpError.Unauthorized());
  if (parts[0] != "Bearer") return next(createHttpError.Unauthorized());

  const jwtToken = parts[1];

  try {
    const payload = await verifyJWT(jwtToken);
    const authUser = await Author.findById(payload.userId);
    if (!authUser) throw new Error("No user");
  } catch (error) {
    next(createHttpError.Unauthorized());
  }
}

export default authentication;
