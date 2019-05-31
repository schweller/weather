const app = require('../../app')
const request = require('supertest')
const httpMocks = require('node-mocks-http')
const nock = require('nock')
const { getCountriesHandler, getSubdivisionsByCountryHandler } = require('../../routes/countries')
const { getCountriesFixture, getSubdivisionsByCountryFixture } = require('./countries.fixture') 


describe('/api/countries Suite', () => {
  describe('GET /api/countries', () => {
    beforeEach(() => {
      nock('https://restcountries.eu/rest/v2/all')
        .get('')
        .reply(200, getCountriesFixture)
    })
  
    test('returns 200 with a mock data', async () => {
      let response
      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/countries'
      })
  
      response = httpMocks.createResponse()
      await getCountriesHandler(req, response)
      
      const data = response._getJSONData()
      expect(response.statusCode).toBe(200)
      expect(response._isEndCalled()).toBe(true)
      expect(data.test).toBe(getCountriesFixture.test)
    })
  })

  describe('GET /api/countries/subdivions/USA', () => {
    beforeEach(() => {
      nock('http://services.groupkt.com')
        .get('/state/get/USA/all')
        .reply(200, getSubdivisionsByCountryFixture)
    })

    test('returns 200 with a mock data', async () => {
      let response
      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/countries/subdivisions',
        params: {
          country: 'USA'
        }
      })

      response = httpMocks.createResponse()
      await getSubdivisionsByCountryHandler(req, response)
      
      const data = response._getJSONData()
      expect(response.statusCode).toBe(200)
      expect(response._isEndCalled()).toBe(true)
      expect(data.length).toBe(0)
    })
  })
  
})


