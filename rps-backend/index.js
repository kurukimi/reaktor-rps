const express = require('express')
const cors = require('cors')
const gameApi = require('./controllers/historyapi')
const {downloadDatabase} = require('./services/historyService')
const config = require('./utils/config')


const syncdb = async () => {
  
    console.log('syncing data')
    await downloadDatabase()
    .catch(e => console.log(e)) 
  
}

syncdb()
setInterval(syncdb, 1200000)


const app = express()

app.use(cors())
app.use(express.static('build'))

app.use('/rps', gameApi)
const port = config.PORT || 80
app.listen(port)

