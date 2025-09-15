import express from "express";

import { login } from "../controllers/auth.js";
import passport from "passport";

const authRouter = express.Router();

authRouter.post("/register", login);

authRouter.get('/login-google', passport.authenticate('google', { scope: ['profile', 'email'] }))

authRouter.get(
    "/callback-google",
    passport.authenticate("google", { session: false }),
    (request, response) => {
        response.redirect(process.env.FRONTEND_HOST + "/login?jwt=" + request.user.jwt);
    }
);



export default authRouter;
