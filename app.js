import dotenv from 'dotenv';
import e from "express";
import chatrouter from './routes/chats.router.js';
import grouprouter from './routes/chats.router.js';
import connectrouter from './routes/connect.router.js';
import usersrouter from './routes/users.router.js';
import mongoose from 'mongoose';

dotenv.config()

await mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Mongodb connected"))
    .catch(err => console.log(err))

const app = e();


app
    .use(e.urlencoded({ extended: false }))
    .use((_, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next()
    });

app
    .use('/api/v1/chats', chatrouter)
    .use('/api/v1/groups', grouprouter)
    .use('/api/v1/connect', connectrouter)
    .use('/api/v1/users', usersrouter)



export default app;
