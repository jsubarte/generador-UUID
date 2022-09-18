import express from 'express'
import fs from 'fs'
import https from 'https'
import helmet from 'helmet'
import compression from 'compression'
import {v4 as uuidv4} from 'uuid'
import dotenv from 'dotenv/config'
import cors from 'cors'

const httpsServerOptions = {
    key: fs.readFileSync(process.env.KEY_PATH),
    cert: fs.readFileSync(process.env.CERT_PATH)
}

const app = express()
app.use(express.static('./public'))

app.use(helmet())
app.use(compression())
app.use(cors())

const serverHttps = https.createServer(httpsServerOptions,app)
serverHttps.listen(process.env.HTTPS_PORT, process.env.IP, () => { console.log(`Servidor Online y escuchando en puerto ${process.env.HTTPS_PORT}`)})

app.use( (req, res, next) => {
    req.secure ? next() : res.redirect(`https://${req.headers.host}${req.url}`)
} )

app.get('/api/get-uuid', (req, res) => {
    res.json({codigo:uuidv4()})
})

app.get('*', (req, res) => {
    res.status(404).json({codigo:{msg: "Error 404 - Recurso no encontrado"}})
})