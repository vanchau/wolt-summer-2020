const express = require('express')
const app = express()

const restaurantsRouter = require('./controllers/restaurants')

app.use('/restaurants', restaurantsRouter)

module.exports = app