const express = require('express')
const countriesController = require('../controllers/countries')
const router = express.Router()

const getCountriesHandler = async (req, res) => {
  const countries = await countriesController.getCountries()

  res.status(200).send(JSON.stringify(countries))
} 

const getSubdivisionsByCountryHandler = async (req, res) => {
  const { country } = req.params
  const subdivisions = await countriesController.getSubdivisionsByCountry(country)
  
  res.status(200).send(JSON.stringify(subdivisions))
}

router.get(`/`, getCountriesHandler)
router.get(`/subdivisions/:country`, getSubdivisionsByCountryHandler)

module.exports = {
  countriesRouter: router,
  getCountriesHandler: getCountriesHandler,
  getSubdivisionsByCountryHandler: getSubdivisionsByCountryHandler
}
