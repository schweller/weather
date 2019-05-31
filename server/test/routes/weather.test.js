const httpMocks = require('node-mocks-http')
const nock = require('nock')
const { getWeatherHandler } = require('../../routes/weather')
const { getWeatherFixture } = require('./fixtures/weather.fixture') 

describe('/api/weather Suite', () => {
  describe('GET /api/weather/USA/Sacramento 200', () => {
    beforeEach(() => {
      nock('http://api.openweathermap.org/data/2.5')
        .get('/weather?q=Sacramento,USA&APPID=eb212045c90a1d90a521b88ea995cc3a')
        .reply(200, getWeatherFixture)
    })
  
    test('returns a mock data', async () => {
      let response
      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/weather',
        params: {
          country: 'USA',
          subdivision: 'Sacramento'
        }
      })
  
      response = httpMocks.createResponse()
      await getWeatherHandler(req, response)
      
      const data = response._getJSONData()
      expect(response.statusCode).toBe(200)
      expect(response._isEndCalled()).toBe(true)
      expect(data.message).toBe('test in Sacramento')
    })
  })

  describe('GET /api/weather/USA/Sacramento 404', () => {
    beforeEach(() => {
      nock('http://api.openweathermap.org/data/2.5')
        .get('/weather?q=Haganata,USA&APPID=eb212045c90a1d90a521b88ea995cc3a')
        .reply(404)
    })
  
    test('returns a error', async () => {
      let response
      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/weather',
        params: {
          country: 'USA',
          subdivision: 'Haganata'
        }
      })
  
      response = httpMocks.createResponse()
      await getWeatherHandler(req, response)
      
      const data = response._getJSONData()
      expect(response.statusCode).toBe(404)
      expect(response._isEndCalled())
      expect(data.error).toBe('No weather found for Haganata')
    })
  })
})


