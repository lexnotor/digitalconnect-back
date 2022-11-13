import sqliteSession from 'connect-sqlite3';
import dotenv from 'dotenv';
import e from "express";
import session from 'express-session';
import mongoose from 'mongoose';
import passport from 'passport';
import { default as chatrouter, default as grouprouter } from './routes/chats.router.js';
import connectrouter from './routes/connect.router.js';
import usersrouter from './routes/users.router.js';
import fs from 'fs'


dotenv.config()

await mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Mongodb connected"))
    .catch(err => console.log(err))

const app = e();


app
    .use(e.urlencoded({ extended: false }))
    .use((req, res, next) => {
        if (req.headers.origin)
            res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
        next()
    });



const SQLiteStore = sqliteSession(session)

app.options(/.*/, (req, res) => {
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.end();
});
app.get('/index', (req, res) => {
    fs.createReadStream('./index.html').pipe(res)
})
app
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        next()
    })
    .use(session({
        secret: '34f43ecba0029845ffecb23',
        resave: false,
        saveUninitialized: false,
        store: new SQLiteStore({
            db: 'session.db',
            table: 'sessions',
            dir: './var',
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 5,
            sameSite: 'none',
        }
    }))
    .use(passport.authenticate('session'))

app
    .use('/api/v1/connect', connectrouter)
    .use((req, res, next) => {
        if (req.user) next();
        else res.json({ message: 'please login' })
    })
    .use('/api/v1/chats', chatrouter)
    .use('/api/v1/groups', grouprouter)
    .use('/api/v1/users', usersrouter)


export default app;
