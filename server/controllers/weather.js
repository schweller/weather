const axios = require('axios')
const { OPENWEATHER_API_KEY, OPENWEATHER_API_URI } = require('../constants')

const handleWeatherSuccess = (data) => {
  return { message: `${data.weather[0].description} in ${data.name}` }
}

exports.getWeather = async (country, subdivision) => {
  const response = await axios(
    `${OPENWEATHER_API_URI}/weather?q=${subdivision},${country}&APPID=${OPENWEATHER_API_KEY}`
  )
    .then(result => handleWeatherSuccess(result.data))
    .catch(error => error.response.status)

  return response
}
