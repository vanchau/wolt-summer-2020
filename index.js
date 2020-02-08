
const express = require('express')
const app = express()

const restaurantsRouter = require('./controllers/restaurants')

app.use('/restaurants', restaurantsRouter)

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
