const app = require('./app')

const SERVERPORT = process.env.SERVERPORT

const main = async () => {
  app.listen(SERVERPORT)
  console.log(`API Server - listening on port: ${SERVERPORT}`)
}

main()
