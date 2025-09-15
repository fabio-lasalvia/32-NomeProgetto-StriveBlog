import GoogleStrategy from 'passport-google-oauth20'
import { generateJWT } from '../helpers/oldJwt.js'
import Author from '../models/Author.js'

const googleStrategy = new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.BACKEND_HOST}:${process.env.PORT}${process.env.GOOGLE_CALLBACK_PATH}`,
    },

    async function (accessToken, refreshToken, profile, callback) {
        try {
            let author = await Author.findOne({ googleId: profile.id })

            if (!author) {
                author = await Author.create({
                    name: profile.name._json.given_name,
                    surname: profile._json.family_name,
                    email: profile._json.email,
                    avatar: profile._json.picture,
                    googleId: profile.id,
                })
            }

            const jwt = await generateJWT({ id: author._id })

            callback(null, { author, jwt })
        } catch (error) {
            callback(error, null)
        }
    }
)

export default googleStrategy