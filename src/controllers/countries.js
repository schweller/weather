const axios = require('axios')

exports.getCountries = async (req, res) => {
  const { data } = await axios(process.env.COUNTRIES_API_URI)
  res.status(200).send(data)
}

exports.getSubdivisionsByCountry = async(req, res) => {
  const { country } = req.params
  const { data } = await axios(`http://services.groupkt.com/state/get/${country}/all`)
  console.log(data)
  res.status(200).send(data)
}
