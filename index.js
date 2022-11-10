import dotenv from 'dotenv'
import app from './app.js'
import http from 'http'

dotenv.config()

const server = http.createServer(app)

const listernning = server.listen(process.env.PORT || 3000, () => {
    console.log(`Serveur en écoute sur le port ${listernning.address().port}`);
})
