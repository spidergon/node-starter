import express from 'express'
import helmet from 'helmet'
import compression from 'compression'
import session from 'express-session'
import connectMongo from 'connect-mongo'
import mongoose from 'mongoose'
import morgan from 'morgan'
import env, { isDev, isProd } from './env'
import setRoutes from './routes'
import { notFound, devErrors, prodErrors } from '../src/helpers/errorHandlers'

const server = express()

console.log(`Environment: ${server.get('env')}`)

server.use(helmet()) // cleaning http headers
server.use(compression()) // gzip compression of the response body
server.use(express.json()) // for parsing application/json

const sess = {
  secret: env.secret,
  saveUninitialized: false, // don't create session until something stored
  resave: false, // don't save session if unmodified
  store: new (connectMongo(session))({
    mongooseConnection: mongoose.connection,
    touchAfter: 24 * 3600 // time period in seconds
  }),
  cookie: { maxAge: 3600000 } // one hour
}

if (isProd) {
  server.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}

server.use(session(sess))

if (isDev) server.use(morgan('dev')) // HTTP request logger

setRoutes(server)

server.use(notFound) // manage 404 errors

if (isDev) {
  server.use(devErrors) // manage development errors - prints stack trace
}

server.use(prodErrors) // manage production errors

export default server

export const port = env.port
