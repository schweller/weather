const axios = require('axios')
const { COUNTRIES_API_URI, SUBDIVISIONS_API_URI } = require('../constants')

exports.getCountries = async () => {
  const response = await axios(COUNTRIES_API_URI)
    .then(result => result.data)
  
  return response
}

exports.getSubdivisionsByCountry = async(country) => {
  const response = await axios(`${SUBDIVISIONS_API_URI}/${country}/all`)
    .then(result => result.data.RestResponse.result)

  return response
}
