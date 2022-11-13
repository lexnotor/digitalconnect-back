import e from "express"
import mongoose from "mongoose"
import passport from "passport";
import { BasicStrategy } from "passport-http";
import { userSchema } from "../database/schemas.js";

const users = mongoose.model('users', userSchema);

passport.use(new BasicStrategy(async (username, password, done) => {
    console.log({ username, password });
    /**
     * @type {mongoose.Document<userSchema>}
     */
    const response = await (users.findOne({
        $or: [
            { username, password },
            { email: username, password }
        ]
    }, { email: 1, nom: 1, username: 1, uri: 1, prenom: 1 }).exec())

    if (response)
        return done(null, { ...response })
    else return done(null, null)
}))

passport.serializeUser((user, done) => {
    process.nextTick(() => {
        done(null, { id: user.id, username: user.username })
    })
})
passport.deserializeUser((user, done) => {
    process.nextTick(() => {
        done(null, user)
    })
})


/**
 * 
 * @param {e.Request} req 
 * @param {e.Response} res 
 */
export const connectUser = (req, res) => {
    res.json({ ...req.user, message: 'connected' })
}
