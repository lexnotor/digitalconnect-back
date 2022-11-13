import dotenv from 'dotenv'
import app from './app.js'
import http from 'http'
import mongoose from 'mongoose';

dotenv.config()

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

// and then starting listerning
const listernning = server.listen(process.env.PORT || 3000, () => {
    console.log(`Serveur en écoute sur le port ${listernning.address().port}`);
})
