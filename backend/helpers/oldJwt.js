import jwt from "jsonwebtoken";

export async function generateJWT(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30d" }, (error, token) => {
      if (error) reject(error);
      else resolve(token);
    });
  });
}

export async function verifyJWT(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) reject(error);
      else resolve(decoded);
    });
  });
}
