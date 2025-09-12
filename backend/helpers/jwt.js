import jwt from "jsonwebtoken";

export async function signJWT(payload) {
    jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRESIN
    })
}

export function verifyJWT(token) {
    return jwt.verify(token, process.env.JWT_SECRET)
}