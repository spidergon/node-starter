import express from 'express'
import setRoutes from './routes'

const server = express()

server.use(express.json())

setRoutes(server)

export default server
