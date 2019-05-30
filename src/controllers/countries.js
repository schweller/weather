const axios = require('axios')

exports.getCountries = async (req, res) => {
  const response = await axios(process.env.COUNTRIES_API_URI)
    .then(result => result.data)

  res.status(200).send(response)
}

exports.getSubdivisionsByCountry = async(req, res) => {
  const { country } = req.params
  const response = await axios(`http://services.groupkt.com/state/get/${country}/all`)
    .then(result => result.data.RestResponse.result)
  
  res.status(200).send(response)
}
