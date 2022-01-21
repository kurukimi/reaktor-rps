const express = require('express')
const cors = require('cors')
const gameApi = require('./controllers/historyapi')
const {downloadDatabase} = require('./services/historyService')
const config = require('./utils/config')
let lock = false
const syncJob = () => {
  if (!lock) {
    lock = true
    console.log('syncing data')
    downloadDatabase()
      .then(() => {
        lock = false
      })
      .catch((e) => {
        console.log(e)
        lock = false
      })
  }
  
}

syncJob()
setInterval(syncJob, 1200000)


const app = express()

app.use(cors())
app.use(express.static('build'))

app.use('/rps', gameApi)
const port = config.PORT || 80
app.listen(port)

