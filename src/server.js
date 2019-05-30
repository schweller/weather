const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')

/**
 * Load environment variables
 */
dotenv.config({path: '.env' })

app.use(cors())
app.get('/', (req, res) => res.send('Hello World!'))

const countriesController = require('./controllers/countries')
const weatherController = require('./controllers/weather')

app.get('/countries', countriesController.getCountries)
app.get('/countries/subdivisions/:country', countriesController.getSubdivisionsByCountry)
app.get('/weather/:country/:subdivision', weatherController.getWeather)

app.listen(9000)
