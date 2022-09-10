import express from 'express'
import controller from '../controllers/item.controller'

const app = express.Router()

app.get('/get/', controller.getItems)
app.get('/get/:id', controller.getOneItem)

export = app
