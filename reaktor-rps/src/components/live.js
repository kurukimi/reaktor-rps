import React, { useEffect, useState } from "react"
import Game from "./game"
import styles from '../styles/Live.module.css'
import { List, ListItem } from "@mui/material"


const webSocketAddress = 'wss://bad-api-assignment.reaktor.com/rps/live'

const Live = () => {
    const [live, setLive] = useState([])
    
  useEffect(() => {
    const ws = new WebSocket(webSocketAddress)
    
    ws.addEventListener('message', (event) => { 
      const gameData = JSON.parse(JSON.parse(event.data))

      if (gameData.type === "GAME_BEGIN") {
        setLive((prev) => [...prev, gameData])
      }
      else if (gameData.type === "GAME_RESULT") {
        setLive((prev) =>
        prev.map((game) =>
          game.gameId === gameData.gameId ? gameData : game
        )
        )
        setInterval(() => {
          setLive((prev) =>
            prev.filter((game) => game.gameId !== gameData.gameId)
          );
        }, 4000)
      }
    })
    ws.addEventListener('error', () => console.log("Error occurred"))

  }, [])


  if (live.length === 0){
    return <h3>Waiting for live data...</h3>
  }
  return (
    <React.Fragment>
    <div className={styles.div}>
        <h3 align="center">LIVE</h3>
        <List >
        {live.map((game, key) => (
          <ListItem key={key}>
          <Game
          game={game}
          />
          </ListItem>
        ))}
        
      </List>
    
    </div>
    </React.Fragment>
  )
}

export default Live

