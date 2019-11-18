import express from 'express'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'
import env, { isDev, isProd } from './env'
import setRoutes from './routes'
import cors from './middlewares/cors'
import session from './middlewares/session'
import { notFound, devErrors, prodErrors } from './middlewares/errorHandlers'

const server = express()

if (!isProd) console.log(`Environment: ${server.get('env')}`)

server.use(helmet()) // cleaning http headers
server.use(cors) // prevent cors errors
server.use(compression()) // gzip compression of the response body
server.use(express.json()) // for parsing application/json
server.use(session)

if (isProd) server.set('trust proxy', 1) // trust first proxy

if (isDev) server.use(morgan('dev')) // HTTP request logger

setRoutes(server)

server.use(notFound) // manage 404 errors

if (isDev) server.use(devErrors) // manage development errors - prints stack trace

server.use(prodErrors) // manage production errors

export default server

export const port = env.port
