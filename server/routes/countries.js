const express = require('express')
const countriesController = require('../controllers/countries')
const router = express.Router()

router.get(`/`, async (req, res) => {
  const countries = await countriesController.getCountries()

  res.status(200).send(countries)
})

router.get(`/subdivisions/:country`, async (req, res) => {
  const { country } = req.params
  const subdivisions = await countriesController.getSubdivisionsByCountry(country)

  res.status(200).send(subdivisions)
})

module.exports = router