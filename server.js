const express = require('express')
const app = express()
const cors = require('cors')
const axios = require('axios')

app.use(cors())
app.get('/', (req, res) => res.send('Hello World!'))

const getCountries = async () => {
  const countries = await axios('https://restcountries.eu/rest/v2/all')
  return countries && countries.data
}

app.get('/countries', async (req, res) => {
  const countries = await getCountries()
  res.status(200).json(countries)
})

app.listen(9000)
