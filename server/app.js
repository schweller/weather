//Core Modules
const express = require('express')
const dotenv = require('dotenv')

/**
 * Load environment variables
 */
dotenv.config({path: '../.env' })

const routes = require('./routes')

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
app.use('/api', routes)
app.get('/', (req, res) => res.send('Hello World!'))

module.exports = app
