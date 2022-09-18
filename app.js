import express from 'express'
import http from 'http'
import helmet from 'helmet'
import compression from 'compression'
import {v4 as uuidv4} from 'uuid'
import dotenv from 'dotenv/config'
import { resourceLimits } from 'worker_threads'

const app = express()
app.use(express.static('./public'))

app.use(helmet())
app.use(compression())

const serverHttp = http.createServer(app)
serverHttp.listen(process.env.HTTP_PORT, process.env.IP, () => { console.log(`Servidor Online y escuchando en puerto ${process.env.HTTP_PORT}`)})

app.get('/api/get-uuid', (req, res) => {
    res.json({codigo:uuidv4()})
})

app.get('*', (req, res) => {
    res.status(404).json({codigo:{msg: "Error 404 - Recurso no encontrado"}})
})