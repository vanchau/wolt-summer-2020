const haversine = require('haversine-distance')

// Check for full or partial matches in name, description or tags
const queryMatch = (restaurant, queryString, splitQuery) => {

  // Variable formatting for comparison
  restaurant.name = restaurant.name.toLowerCase()
  restaurant.description = restaurant.description.toLowerCase()
  queryString = queryString.toLowerCase()
  const splitName = restaurant.name.trim().split(' ')
  const splitDescription = restaurant.description.trim().split(' ')
  const tags = restaurant.tags.join('')
  if (splitQuery.some(word =>

    // Check if name, description or tags include the query word, e.g., "Momotoko Citycenter" includes "Citycenter"
    (restaurant.name.includes(word) || restaurant.description.includes(word) || tags.includes(word)) ||

    // Vice versa, e.g., "Citycenter" includes "Döner Harju City" which would be missed above
    (splitName.some(word => queryString.includes(word))) ||
    (splitDescription.some(word => queryString.includes(word))) ||
    (restaurant.tags.some(tag => queryString.includes(tag)))
  )) {
    return true
  }
  else {
    return false
  }
}

// Distance calculated with Haversine formula
const distanceMatch = (restaurant, lat, lon) => {
  const restaurantLocation = { lat: restaurant.location[1], lon: restaurant.location[0] }
  const currentLocation = { lat: lat, lon: lon }

  if (haversine(restaurantLocation, currentLocation) < 3000) {
    return true
  }
  else {
    return false
  }
}

const filterRestaurants = (restaurants, queryString, lat, lon) => {

  const splitQuery = queryString.replace(/\s+/g,' ')  // remove extra whitespace between words
    .trim()                                       // remove extra whitespace before and after the string
    .toLowerCase()                                // for case insensitive comparison
    .split(' ')                                   // split into array of words for partial matches

  // Filter and return restaurants
  return restaurants.filter(restaurant => queryMatch(restaurant, queryString, splitQuery) && distanceMatch(restaurant, lat, lon))
}

module.exports = { filterRestaurants, queryMatch, distanceMatch }