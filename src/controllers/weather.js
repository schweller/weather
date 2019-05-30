const axios = require('axios')

const handleWeatherSuccess = (data) => {
  return `${data.weather[0].description} in ${data.name}`
}

exports.getWeather = async (req, res) => {
  const { country, subdivision } = req.params
  const response = await axios(
    `http://api.openweathermap.org/data/2.5/weather?q=${subdivision},${country}&APPID=eb212045c90a1d90a521b88ea995cc3a`
  )
    .then(result => handleWeatherSuccess(result.data))
    .catch(error => error.response.status)

  if (response === 404) {
    res.status(404).send({error: `No weather found for ${subdivision}`})
  } else {
    res.status(200).send(response)
  }
}
