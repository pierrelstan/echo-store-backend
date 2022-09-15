import express from 'express'
import controller from '../controllers/product.controller'

const app = express.Router()

app.get('/get/', controller.getItems)
app.get('/get/:id', controller.getOneItem)

export = app
