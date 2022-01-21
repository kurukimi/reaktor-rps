const resolveWinner = (games) => {
    const newGames = games.map((game) => {
        if(game.playerA.played==="ROCK" && game.playerB.played==="SCISSORS" ||
            game.playerA.played==="PAPER" && game.playerB.played==="ROCK"   || 
            game.playerA.played==="SCISSORS" && game.playerB.played==="PAPER"
            ) {
            game.winner = game.playerA.name
        }
        else if(game.playerA.played!==game.playerB.played){
            game.winner = game.playerB.name
        }
        else {
            game.winner = null
        }
        return game
    });

    return newGames
}

module.exports = {resolveWinner: resolveWinner}