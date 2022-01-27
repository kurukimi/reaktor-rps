const { GameModel, CursorModel} = require('../models/model')

const {resolveWinner} = require('../utils/resolveWinner')

const axios = require("axios")



const downloadDatabase = async () => {
    const historyUrl = 'https://bad-api-assignment.reaktor.com'
    let cursor = '/rps/history'
    let counter = 0

    while(cursor) {
        let response = null
        try {
           response = await axios.get(`${historyUrl}${cursor}`)
        } catch(err) {
            console.log(err)
            cursor = null
            break
        }
        cursor = response.data.cursor
        const res = await savePage(response)

        if (res === false) {
            console.log('Aborting')
            cursor = null
            break
        } else if (res === undefined) {
            console.log('failed')
            cursor = null
            break
        } else if (counter > 0  && cursor) {
            if (cursor.toString().includes('cursor')) {
                await CursorModel.insertMany({cursor: cursor.toString()})
            }
        }
        
        console.log("Page: ", counter)
        counter++
    }

    
}



const getAllPlayers = async () => {
    const players = await GameModel.distinct('playerB.name')
    .merge(GameModel.distinct('playerA.name'))
    return players
}


const getMostPlayedHand = async (name) => {
    const rocks = await GameModel
    .countDocuments({
        $or: [
            { $and: [{"playerB.name": name}, {"playerB.played": "ROCK"}] },
            { $and: [{"playerA.name": name}, {"playerA.played": "ROCK"}] }
        ]
    })
    const papers = await GameModel
    .countDocuments({
        $or: [
            { $and: [{"playerB.name": name}, {"playerB.played": "PAPER"}] },
            { $and: [{"playerA.name": name}, {"playerA.played": "PAPER"}] }
        ]
    })
    const scissors = await GameModel
    .countDocuments({
        $or: [
            { $and: [{"playerB.name": name}, {"playerB.played": "SCISSORS"}] },
            { $and: [{"playerA.name": name}, {"playerA.played": "SCISSORS"}] }
        ]
    })
    
    const data = [
        {name: "ROCK", amount : rocks},
         {name: "PAPER", amount : papers}, 
         {name: "SCISSORS", amount : scissors}]

    
    let biggest = data[0]
    data.forEach(x => {
        if (x.amount > biggest.amount) {
            biggest = x
        }
    })

    return biggest
}


const getPlayerHistory = async (name) => {
    try {
    const numOfGames = await GameModel
    .countDocuments({$or:[{"playerA.name": name}, {"playerB.name": name}]})
    const wins = await GameModel.countDocuments({'winner': name})
    const winPercent = (wins/numOfGames*100).toFixed(2)
    const mostPlayedHand = await getMostPlayedHand(name)
    return {
        mostPlayedHand: mostPlayedHand,
        winPercent: winPercent,
        numOfGames: numOfGames,
    }
    } catch (e) {
        console.log(e)
    } 

}

const getPlayerGames = async(name, page) => {
    try {
    const allGames = await GameModel
    .find(
        {$or:[{"playerA.name": name}, {"playerB.name": name}]},
        {},
        { sort: { t: -1 }, skip: (page-1)*30, limit: 30 }
        )
    return allGames
    } catch (e) {
        console.log(e)
    }
    
}


const savePage = async (response) => {
    if ((!response.data.cursor) || await cursorIsSaved(response.data.cursor)) {
        return false
    } else {
        
        try {
            const saved = await storeGameResults(resolveWinner(response.data.data))
            if (saved) {
                return response.data.cursor
            }
            return saved
        } catch (err) {
            console.log('Couldnt save games')
            return undefined
        }
        
        
    }
}



const storeGameResults = async (data) => {
    try {
      await GameModel.bulkWrite(data.map((result) => ({
        updateOne: {
          filter: { gameId: result.gameId },
          update: result,
          upsert: true,
        }
      })));
      return true;
    } catch (e) {
      console.log(e);
      return undefined;
    }
  }

const cursorIsSaved = async (pagecursor) => {
    try {
        const cursor = await CursorModel.exists({cursor: pagecursor.toString()})
        if (cursor) {
            return true
        } else return false
    } catch (err) {
        console.log('Couldnt find cursor')
        return false
    }
}



module.exports = {
    downloadDatabase: downloadDatabase,
    getAllPlayers: getAllPlayers,
    getPlayerHistory: getPlayerHistory,
    getPlayerGames: getPlayerGames
}