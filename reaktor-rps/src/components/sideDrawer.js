import React, { useEffect, useState } from 'react'
import { Drawer, Box, List, ListItemText, IconButton, ListItemButton } from '@mui/material'
import axios from 'axios'



const PlayerDrawer = ({setP}) => {
    const anchor = 'left'
    const [open, setOpen] = useState(false)
    const [players, setPlayers] = useState([])

  useEffect(() => {
    const fetchPlayers = async () => {
      const response = await axios.get(`http://${window.location.hostname}/rps/players`)
      const data = response.data
      setPlayers(data)
    }
    fetchPlayers()
  }, [])

  const fetchData = async (name) => {
    setP([])
    const response = await axios.get(`http://${window.location.hostname}/rps/history/${name}`)
    const data = response.data
    console.log(data)
    setP([data])
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