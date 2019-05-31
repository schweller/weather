const app = require('./app')
const { SERVERPORT } = require('./constants')

const main = async () => {
  app.listen(SERVERPORT)
  console.log(`API Server - listening on port: ${SERVERPORT}`)
}

main()
