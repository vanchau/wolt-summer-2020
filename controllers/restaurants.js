const restaurantsRouter = require('express').Router()
const { query, validationResult } = require('express-validator')
const restaurants = require('../data/restaurants.json').restaurants
const haversine = require('haversine-distance')

const filterRestaurants = (q, lat, lon) => {

  q = q.replace(/\s+/g,' ') // remove extra whitespace between words
    .trim()                 // remove extra whitespace before and after the string
    .split(' ')             // split into array of words for partial matches

  // Helper function: Check for full or partial matches in name, description or tags
  const queryMatch = (restaurant) => {
    if (q.some(word => restaurant.name.includes(word)
        || restaurant.description.includes(word)
        || restaurant.tags.includes(word))) {

      return true
    }
  }

  // Helper function: Distance calculated with Haversine formula
  const distanceMatch = (restaurant) => {
    const restaurantLocation = { lat: restaurant.location[1], lon: restaurant.location[0] }
    const currentLocation = { lat: lat, lon: lon }

    if (haversine(restaurantLocation, currentLocation) < 3000) {
      return true
    }
  }

  // Filter and return restaurants
  return restaurants.filter(restaurant => queryMatch(restaurant) && distanceMatch(restaurant))
}

restaurantsRouter.get('/search', [
  query('q')
    .exists().withMessage('Undefined query string.'),
  query('lat')
    .exists().withMessage('Undefined latitude.')
    .isFloat({ min: -90, max: 90 }).withMessage('Invalid latitude format.'),
  query('lon')
    .exists().withMessage('Undefined longitude.')
    .isFloat({ min: -180, max: 180 }).withMessage('Invalid longitude format.')
], (req, res) => {

  // Error handling
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  // Return valid restaurants
  res.json(filterRestaurants(req.query.q, req.query.lat, req.query.lon))
})

module.exports = restaurantsRouter