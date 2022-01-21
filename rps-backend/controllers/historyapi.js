const mongoose = require('mongoose')
const {getAllPlayers, getPlayerHistory} = require('../services/historyService')
const config = require('../utils/config')
const gameRouter = require('express').Router()




if(mongoose.connection.readyState == 0) {
    mongoose.connect(config.DB, {useNewUrlParser: true, useUnifiedTopology: true}).then(
        () => {
            console.log("Database connection state: " + mongoose.connection.readyState);
        },
        (err) => {
            console.log("Database error:" + err)
        }
    )
}


gameRouter.get('/history/:name', async (request, response) => {
    let name = request.params.name
    const history = await getPlayerHistory(name)
    
    response.json(history)
})

gameRouter.get('/players', async (request, response) => {
    getAllPlayers()
        .then(data => response.json(data))
        .catch(e => console.log(e))
    
})


module.exports = gameRouter