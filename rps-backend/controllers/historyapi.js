const mongoose = require('mongoose')
const {getAllPlayers, getPlayerHistory, getPlayerGames} = require('../services/historyService')
const config = require('../utils/config')
const gameRouter = require('express').Router()




if(mongoose.connection.readyState == 0) {
    mongoose.connect(config.DB, {useNewUrlParser: true, useUnifiedTopology: true}).then(
        () => {
            console.log("Connection " + mongoose.connection.readyState);
        },
        (err) => {
            console.log(err)
        }
    )
}


gameRouter.get('/history/:name', (request, response) => {
    let name = request.params.name
    let page = request.query.page
    if (page) {
        getPlayerGames(name, page)
        .then(d => response.json(d))
        .catch(err => console.log(err))
    } else {
        getPlayerHistory(name)
        .then(data => response.json(data))
        .catch(e => console.log(e))
    }
    
})

gameRouter.get('/players', async (request, response) => {
    getAllPlayers()
        .then(data => response.json(data))
        .catch(e => console.log(e))
    
})


module.exports = gameRouter