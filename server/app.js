//Core Modules
const express = require('express')
const { TIME_PER_MAX_REQUESTS, MAX_REQUESTS } = require('./constants')

//Routes Module
const routes = require('./routes')

//Security Modules
const cors = require('cors')
const limiter = require('express-rate-limit')

const rateLimiter = limiter({
  windowMs: TIME_PER_MAX_REQUESTS,
  max: MAX_REQUESTS
})

const app = express()

app.use(rateLimiter)
app.use(cors())
app.use('/api', routes)
app.get('/', (req, res) => res.send('Hello World!'))

module.exports = app
