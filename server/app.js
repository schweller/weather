//Core Modules
const express = require('express')
const path = require('path')
const dotenv = require('dotenv')

/**
 * Load environment variables
 */
dotenv.config({path: `${path.resolve(__dirname)}/../.env` })

//Routes Module
const routes = require('./routes')

//Security Modules
const cors = require('cors')
const limiter = require('express-rate-limit')

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
