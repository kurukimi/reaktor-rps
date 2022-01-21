

const resolveResult = (playerA, playerB) => {
    if (playerA.played === playerB.played) {
        return "TIE"
    }
    else if (
        (playerA.played === "SCISSORS" && playerB.played === "PAPER") ||
        (playerA.played === "PAPER" && playerB.played === "ROCK") ||
        (playerA.played === "ROCK" && playerB.played === "SCISSORS")
    ) {
        return playerA.name + " WINS"
    }
    else {
        return playerB.name + " WINS"
    }

}





export {resolveResult}