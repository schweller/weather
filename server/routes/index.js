const express = require('express')
const router = express.Router()
const { countriesRouter } = require('./countries')
const { weatherRouter } = require('./weather')

router.use('/countries', countriesRouter)
router.use('/weather', weatherRouter)

module.exports = router
