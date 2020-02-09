const restaurantsRouter = require('express').Router()
const { query, validationResult } = require('express-validator')
const restaurants = require('../data/restaurants.json').restaurants
const utils = require('../utils/utils')

restaurantsRouter.get('/search', [
  query('q')
    .notEmpty().withMessage('Undefined query string.'),
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
  res.json(utils.filterRestaurants(restaurants, req.query.q, req.query.lat, req.query.lon))
})

module.exports = restaurantsRouter