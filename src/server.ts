import http from 'http'
import * as dotenv from 'dotenv'
dotenv.config()
import { app } from './app'

app.set('port', process.env.PORT)
const server = http.createServer(app)

server.listen(process.env.PORT, () => {
  console.log(`Server running at ${process.env.PORT}`)
})
