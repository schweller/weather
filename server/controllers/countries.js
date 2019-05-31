const axios = require('axios')

exports.getCountries = async () => {
  const response = await axios(process.env.COUNTRIES_API_URI)
    .then(result => result.data)
  
  return response
}

exports.getSubdivisionsByCountry = async(country) => {
  const response = await axios(`http://services.groupkt.com/state/get/${country}/all`)
    .then(result => result.data.RestResponse.result)

  return response
}
