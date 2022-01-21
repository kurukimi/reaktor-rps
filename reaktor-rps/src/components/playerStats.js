import React, {useState} from 'react'
import { makeStyles } from '@mui/styles'

import Game from './game'

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
    const [page, setPage] = useState(1);
    const classes = useStyles()
    const handleChange = (event, value) => {
        setPage(value);
    };
    return(
        <div>
            <Divider></Divider>
            <h2 align='center'>History</h2>
            <List sx={{px:"5%", py:"10px"}} >
            <Chip className={classes.chip} label="Player"/>
                        <h3 align="center">{games.numOfGames > 0 ? games.name: "No games"}</h3>
            <Chip className={classes.chip} label="Stats"/>
                <Box>
                <ListItem sx={{justifyContent: 'center'}} >
                    <ListItemText align='left'>Win ratio: {games && games.numOfGames>0 ? `${games.winPercent}%` : "Loading..."}</ListItemText>
                    <ListItemText align='center'>Total games: {games && games.numOfGames>0 ? games.numOfGames : "Loading..."}</ListItemText>
                    <ListItemText align='right'>Most played hand: {games && games.numOfGames>0 ? games.mostPlayedHand.name : "Loading..."}</ListItemText>
                    </ListItem>
                </Box>
                <Chip className={classes.chip} label="History games"/>
                <Box>
                    {games && games.numOfGames>0 ? games.allGames.slice(((page - 1)*(5)), ((page)*(5) - 1)).map(game => 
                    <ListItem key={game.gameId}>
                        <Game
                        game={game}
                        
                        />
                    </ListItem>
                    ) : "Loading..."}
                </Box>
                <ListItem sx={{display:"flex", justifyContent: 'center'}}>
                    <Pagination
                       
                        count={Math.ceil(games.numOfGames/5)} 
                        page={page} 
                        onChange={handleChange} 
                        color="primary" 
                        
                    />
               </ListItem>
            </List>
        </div> 
        )
     
    
}

export default PlayerStats;