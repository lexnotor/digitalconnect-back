import dotenv from 'dotenv';
import http from 'http';
import mongoose from 'mongoose';
import { Server as IOServer, Socket } from 'socket.io';
import app from './app.js';
import cloudinary from 'cloudinary'


dotenv.config()

// configure cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

// connection to database ...
await mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Mongodb connected"))
    .catch(err => {
        console.log("Failled to connect mongodb");
        console.error(err);
        process.exit()
    })

// if connection success, create server from express one
const server = http.createServer(app)

// start WebSocket (Socket.Io)
const sockets = [];
/**
 * @type {{uid: String, s: Socket, user_id: String}[]}
 */
export const socket_uid = []
const socket_io = new IOServer(server, { cors: { origin: '*' } });
socket_io.on('connection', (s) => {
    sockets.push(s);
    s.on('disconnect', () => {
        (sockets.indexOf(s) != -1) && sockets.splice(sockets.indexOf(s), 1);
        (socket_uid.findIndex(elm => elm.s == s) != -1) && socket_uid.splice(socket_uid.findIndex(elm => elm.s == s))
    });
    s.on('wait_user_connect', (uid) => {
        socket_uid.push({ uid, s });
    })
})

// and then starting listerning
const listernning = server.listen(process.env.PORT || 3000, () => {
    console.log(`Serveur en écoute sur le port ${listernning.address().port}`);
})
