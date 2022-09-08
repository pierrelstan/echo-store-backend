import express from 'express'
import controller from '../controllers/user.controller'
import authJWT from '../middleware/auth.middleware'

const app = express.Router()

app.get('/validate', authJWT, controller.validateToken)
app.post('/register', controller.register)
app.post('/login', controller.login)
app.get('/get/', controller.getAllUsers)

export = app
