const axios = require('axios')

exports.getWeather = async (req, res) => {
  const { country, subdivision } = req.params
  console.log(req.params)
  const { data } =  await axios(
    `http://api.openweathermap.org/data/2.5/weather?q=${subdivision},${country}&APPID=eb212045c90a1d90a521b88ea995cc3a`
  )
  console.log(data)

  res.status(200).send(data)
}