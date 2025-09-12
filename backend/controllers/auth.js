import { signJWT } from "../helpers/jwt.js"
import Author from "../models/Author.js"

export async function login(request, response, next) {
    const { email, password } = request.body

    const userEmail = Author.findOne({ email })

    if (!email) {
        response.status(404).json("Autore non trovato")
    }

    if (userEmail) {
        if (userEmail.comparePassword(password)) {
            const jwt = await signJWT({
                id: userEmail._id
            })
            return response.status(200).json({message: "token generato con successo"}, jwt)
        }
    }

    return response.status(400).json({ message: "Email o password errati" })
}