import React, { useContext} from 'react'
import { makeStyles } from '@mui/styles'
import { PageContext, MenuContext } from '../App'
import Game from './game'
import axios from 'axios'

import { List, ListItem, ListItemText, Divider, Box, Chip, Pagination } from '@mui/material'

const useStyles = makeStyles({
    card: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '10px'
        
      },
    chip: {
        bgColor:'gray'
        
      }
      
})


const PlayerStats = ({games}) => {
    const {player, setPlayer} = useContext(MenuContext)
    const {page, setPage} = useContext(PageContext)
    const classes = useStyles()
    const handleChange = async (event,value) => {
        setPage(p => value)
        await axios.get(`http://${window.location.hostname}/rps/history/${player.name}?page=${value}`)
        .then(data => {
            setPlayer(prevState => ({              
            ...prevState,   
            allGames: data.data      
            }))
  })
    }
    
    return(
        <div>
            <Divider></Divider>
            <h2 align='center'>History</h2>
            <List sx={{px:"5%", py:"10px"}} >
            <Chip className={classes.chip} label="Player"/>
                        <h3 align="center">{games.name ? games.name: "Loading..."}</h3>
            <Chip className={classes.chip} label="Stats"/>
                <Box sx={{alignItems: 'center', justifyContent: 'center', ml:'20px'}}>
                <ListItem >
                    <ListItemText align='left'>Win ratio: {games.winPercent ? `${games.winPercent}%` : "Loading..."}</ListItemText>
                    <ListItemText align='center'>Total games: {games.numOfGames ? `${games.numOfGames}` : "Loading..."}</ListItemText>
                    <ListItemText align='right'>Most played hand: {games.mostPlayedHand ? `${games.mostPlayedHand.name}` : "Loading..."}</ListItemText>
                    </ListItem>
                </Box>
                <Chip className={classes.chip} label="History games"/>
                <Box>
                    {games.allGames ? games.allGames.map(game => 
                    <ListItem key={game.gameId}>
                        <Game
                        game={game}
                        
                        />
                    </ListItem>
                    ) :  "Loading..."}
                </Box>
                <ListItem sx={{display:"flex", justifyContent: 'center'}}>
                    {games.numOfGames ? <Pagination
                        count={Math.ceil(games.numOfGames/30)} 
                        page={page} 
                        onChange={handleChange} 
                        color="primary" 
                    /> : ''}
               </ListItem>
            </List>
        </div> 
        )
     
    
}

export default PlayerStats;