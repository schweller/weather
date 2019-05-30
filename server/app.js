//Core Modules
const express = require('express')
const dotenv = require('dotenv')

/**
 * Load environment variables
 */
dotenv.config({path: '.env' })

//Security Modules
const cors = require('cors')
const limiter = require('express-rate-limit')

// Controllers
const countriesController = require('./controllers/countries')
const weatherController = require('./controllers/weather')

const rateLimiter = limiter({
  windowMs: process.env.TIME_PER_MAX_REQUESTS,
  max: process.env.MAX_REQUESTS
})

const app = express()

app.use(rateLimiter)
app.use(cors())
app.get('/', (req, res) => res.send('Hello World!'))

app.get('/countries', countriesController.getCountries)
app.get('/countries/subdivisions/:country', countriesController.getSubdivisionsByCountry)
app.get('/weather/:country/:subdivision', weatherController.getWeather)

module.exports = app
