import express from 'express'
import mongoose from 'mongoose'
import itemRoutes from './routes/items'

import dotenv from 'dotenv'
dotenv.config()

const app = express()

mongoose
  .connect(process.env.MONGODB_API_KEY, { retryWrites: true, w: 'majority' })
  .then(() => {
    console.log('Successfully connected to MONGODB ATLAS!')
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())

    /** Rules of our API */
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*')
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
      )

      if (req.method == 'OPTIONS') {
        res.header(
          'Access-Control-Allow-Methods',
          'PUT, POST, PATCH, DELETE, GET'
        )
        return res.status(200).json({})
      }

      next()
    })

    /** Routes */
    app.use('/items', itemRoutes)

    /** Healthcheck */
    app.get('/ping', (req, res, next) =>
      res.status(200).json({ hello: 'world' })
    )

    /** Error handling */
    app.use((req, res, next) => {
      const error = new Error('Not found')

      res.status(404).json({
        message: error.message,
      })
    })
  })
  .catch((error) => {
    console.log('Unable to connect to MONGODB ATLAS!')
    console.error(error)
  })

export { app }
