import React from 'react'

import styles from '../styles/Live.module.css'
import { resolveResult } from "../util"
import { Card} from '@mui/material'
import { styled } from '@mui/material'

const Item = styled(Card)(({ theme }) => ({
    ...theme.typography.body2,
  
  }))

const Game = ({game}) => {
    
  return (
    <Item variant='outlined' className={styles.card}>
            <span className={resolveResult(game.playerA, game.playerB) === (game.playerA.name + " WINS") ? styles.winner : ''} >
            {game.playerA.name}
          </span>

          {game.playerA?.played ? (
            <span>{game.playerA.played}</span>
          ) : (
            'ONGOING'
          )}
          <span>vs</span>
          {game.playerB?.played ? (
            <span>{game.playerB.played}</span>
          ) : (
            'ONGOING'
          )}
          <span
            className={resolveResult(game.playerA, game.playerB) === (game.playerB.name + " WINS") ? styles.winner : ''}
          >
            {game.playerB.name}
          </span>
        </Item>
    
  )


}

export default Game