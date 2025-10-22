const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors()) // Permite todas las conexiones
app.use(express.json())