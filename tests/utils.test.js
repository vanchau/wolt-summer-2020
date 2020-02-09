const testRestaurants = require('../data/test_restaurants.json')
const utils = require('../utils/utils')

//const api = supertest(app)

/**
 * Unit test cases with modified test data for queryMatch() in utils
 *
 * 1) Return true with query "burger" when it only appears in "Social Burgerjoint Citycenter" name
 * 2) Return true with query "burger" when it appears as in "hamburger" tag
 * 3) Return true with query "hamburger" when it appears in "burger" tag
 * 4) Return true with query "burger" when it appears as in "Asenneburgeri" in description
 * 5) Return true with query "burger sushi" when it appears as partial match
 * 6) Return false with query "sushi" when no matches are found at all
 *
 */

describe('queryMatch helper function', () => {

  test('1. returns true with exact match only in name', async() => {
    expect(utils.queryMatch(testRestaurants[0], 'burger', ['burger'])).toBe(true)
  })

  test('2. returns true with exact match only in tag', async() => {
    expect(utils.queryMatch(testRestaurants[1], 'burger', ['burger'])).toBe(true)
  })

  // Possibly bad, e.g., tag: "ham", query: "hamburger" is a match. Depends on the types of the tags.
  test('3. returns true with exact match only in tag (tag as substring of query)', async() => {
    expect(utils.queryMatch(testRestaurants[1], 'hamburger', ['hamburger'])).toBe(true)
  })

  test('4. returns true with exact match only in description', async() => {
    expect(utils.queryMatch(testRestaurants[2], 'burger', ['burger'])).toBe(true)
  })

  test('5. returns true with partial match', async() => {
    expect(utils.queryMatch(testRestaurants[0], 'burger sushi', ['burger', 'sushi'])).toBe(true)
  })

  test('6. returns false with non-matching input', async() => {
    expect(utils.queryMatch(testRestaurants[0], 'sushi', ['sushi'])).toBe(false)
  })

})

/**
   * Unit test cases with modified test data for filterRestaurants() in utils
   *
   * 6) Return only Biang! Citycenter with query "Biang!" as there is only one Biang
   * 7) Return all restaurants in citycenter with query "Citycenter", "Döner Harju City" included
   * 8) Return all restaurants with citykäytävä (and city) match but no Citycenter with query "citykäytävä".
   *
   */

describe('filterRestaurants function', () => {

  test('7. returns one specific restaurant with exact name match', async() => {
    expect(utils.filterRestaurants(testRestaurants, 'Bi\u00e1ng!', 60.16990, 24.94148).length).toBe(1)
  })

  test('8. returns all citycenter restaurants in test data', async() => {
    expect(utils.filterRestaurants(testRestaurants, 'Citycenter', 60.16990, 24.94148).length).toBe(4)
  })

  test('9. returns all city(kaytava) restaurants in test data but not citycenter', async() => {
    expect(utils.filterRestaurants(testRestaurants, 'Cityk\u00e4yt\u00e4v\u00e4', 60.16990, 24.94148).length).toBe(2)
  })

})