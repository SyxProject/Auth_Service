const express = require('express')
const app = express()
const userController = require('./controllers/user.controller')

app.use(express.json())

app.post('/login', userController.login)
app.post('/logout', userController.logout)
app.post('/status', userController.checkStatus)

module.exports = app