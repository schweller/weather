const express = require('express')
const weatherController = require('../controllers/weather')
const router = express.Router()

router.get(`/:country/:subdivision`, async (req, res) => {
  const { country, subdivision } = req.params
  const response = await weatherController.getWeather(country, subdivision)

  if (response === 404) {
    res.status(404).send({error: `No weather found for ${subdivision}`})
  } else {
    res.status(200).send(response)
  }
})

module.exports = router