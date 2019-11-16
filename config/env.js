import dotenv from 'dotenv'

dotenv.config()

export default {
  mongoDB_URI:
    process.env.MONGODB_URI || 'mongodb://localhost:27017/node-starter',
  port: process.env.PORT || 5000
}
