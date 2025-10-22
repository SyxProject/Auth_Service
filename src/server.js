const express = require('express')
const cors = require('cors')
const app = express()
const userController = require('./controllers/user.controller')

app.use(cors()) // Permite todas las conexiones
app.use(express.json())

app.post('/login', userController.login)
app.post('/logout', userController.logout)
app.post('/status', userController.checkStatus)

module.exports = app