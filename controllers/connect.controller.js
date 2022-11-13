import e from "express"
import mongoose from "mongoose"
import passport from "passport";
import { BasicStrategy } from "passport-http";
import { userSchema } from "../database/schemas.js";

const contacts = mongoose.model('users', userSchema);

passport.use(new BasicStrategy((userid, password, done) => {
    console.log({ userid, password });
    return done(null, { username: 'alex', id: '234' })
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
