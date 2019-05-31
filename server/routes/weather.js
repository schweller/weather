const express = require('express')
const weatherController = require('../controllers/weather')
const router = express.Router()

const getWeather = async (req, res) => {
  const { country, subdivision } = req.params
  const response = await weatherController.getWeather(country, subdivision)

  if (response === 404) {
    res.status(404).send({error: `No weather found for ${subdivision}`})
  } else {
    res.status(200).send(response)
  }
}

router.get(`/:country/:subdivision`, getWeather)

module.exports = {
  weatherRouter: router,
  getWeather
}