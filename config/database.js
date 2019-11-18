import mongoose from 'mongoose'
import env, { isDev } from './env'

class Connection {
  constructor () {
    if (isDev) console.log('Establish new connection with url', env.mongoDB_URI)
    mongoose.Promise = global.Promise
    mongoose.connection.on('error', err => {
      console.error(`Mongoose connection error → ${err.message}`)
    })
    mongoose.connect(env.mongoDB_URI, {
      useNewUrlParser: true,
      // useFindAndModify: false,
      // useCreateIndex: true,
      useUnifiedTopology: true
    })
  }
}

export default new Connection()

export { mongoose }
