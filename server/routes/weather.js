const express = require('express')
const weatherController = require('../controllers/weather')
const router = express.Router()

const getWeatherHandler = async (req, res) => {
  const { country, subdivision } = req.params
  const response = await weatherController.getWeather(country, subdivision)

  if (response === 404) {
    res.status(404).json({error: `No weather found for ${subdivision}`})
  } else {
    res.status(200).send(JSON.stringify(response))
  }
}

router.get(`/:country/:subdivision`, getWeatherHandler)

module.exports = {
  weatherRouter: router,
  getWeatherHandler
}