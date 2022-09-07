import express from 'express'
import controller from '../controllers/items'

const app = express.Router()

app.get('/get/', controller.readAll)

export = app
