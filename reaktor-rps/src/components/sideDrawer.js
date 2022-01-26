import React, { useEffect, useState, useContext} from 'react'
import { Drawer, Box, List, ListItemText, IconButton, ListItemButton } from '@mui/material'
import axios from 'axios'
import { MenuContext ,PageContext} from '../App'


const PlayerDrawer = () => {
    
    const {page, setPage} = useContext(PageContext)
    const {setPlayer, player} = useContext(MenuContext)
    const anchor = 'left'
    const [open, setOpen] = useState(false)
    const [players, setPlayers] = useState([])
    

  useEffect(() => {
    const fetchPlayers = async () => {
      const response = await axios.get(`http://${window.location.hostname}/rps/players`)
      .catch(e => console.log(e))
      const data = response.data
      setPlayers(p => data)
      
    }
    fetchPlayers()
  }, [])

  
  
  const fetchData = async (p) => {
    
    // if player changed
    if (p !== player) {
      setPage(p => 1)
      setPlayer({})
      const data = await axios.get(`http://${window.location.hostname}/rps/history/${p}`)
      .catch(e => console.log(e))
      setPlayer({
        name: data.data.name,
        mostPlayedHand: data.data.mostPlayedHand,
        winPercent: data.data.winPercent,
        numOfGames: data.data.numOfGames,
        allGames: null
      })
    }
  
  const d = await axios.get(`http://${window.location.hostname}/rps/history/${p}?page=${page}`)
  .catch(e => console.log(e))
    setPlayer(prevState => ({              
    ...prevState,   
      allGames: d.data      
    }))
  
  }



  const toggleDrawer = () => {
    setOpen(!open);
  }  

  const playerList = () => (
      
    <Box
      sx={{ width: 250 }}
      role='presentation'
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <List>
        {
          players.map((player) => (
            <ListItemButton
              key={player}
              onClick={() => fetchData(player)}
            >
              <ListItemText primary={player} />
            </ListItemButton>
          ))
        }
      </List>

    </Box>
  )

  return (
    <div>
      <IconButton
        size="medium"
        color="inherit"
        aria-label="select player"
        onClick={toggleDrawer}
      >
        Players
      </IconButton>
      <Drawer
        anchor={anchor}
        open={open}
        onClose={toggleDrawer}
      >
        { playerList() }
      </Drawer>
    </div>
  )


}

export default PlayerDrawer