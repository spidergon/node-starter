import './config/database'
import env from './config/env'
import server from './config/server'

server.listen(env.port, () => {
  console.log(`Server running → http://localhost:${env.port}`)
})
