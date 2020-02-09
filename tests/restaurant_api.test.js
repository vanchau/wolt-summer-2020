const supertest = require('supertest')
const app = require('../app.js')

const api = supertest(app)

/**
 * API endpoint tests
 *
 * 1) Restaurants should be returned in JSON-format
 * 2-7) Invalid query parameter checks
 *
 */

describe('with a valid query', () => {

  test('1. restaurants are returned in json format', async () => {
    await api.get('/restaurants/search?q=sushi&lat=60.17045&lon=24.93147')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

})

describe('with invalid query, response status 422', () => {

  test('2. is returned on missing query string', async () => {
    await api.get('/restaurants/search?lat=60.17045&lon=24.93147')
      .expect(422)
  })

  test('3. is returned on empty query string', async () => {
    await api.get('/restaurants/search?q=lat=60.17045&lon=24.93147')
      .expect(422)
  })

  test('4. is returned on missing latitude', async () => {
    await api.get('/restaurants/search?q=sushi&lon=24.93147')
      .expect(422)
  })

  test('5. is returned on invalid latitude format', async () => {
    await api.get('/restaurants/search?q=sushi&lat=41N&lon=24.93147')
      .expect(422)
  })

  test('6. is returned on missing longitude', async () => {
    await api.get('/restaurants/search?q=sushi&lat=60.17045')
      .expect(422)
  })

  test('7. is returned on invalid longitude format', async () => {
    await api.get('/restaurants/search?q=sushi&lat=60.17045&lon=24W')
      .expect(422)
  })
})
