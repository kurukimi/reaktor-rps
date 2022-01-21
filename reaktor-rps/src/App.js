import React, {  useState} from "react"
import './App.css'
import DenseAppBar from "./components/appBar";
import Live from "./components/live";
import {CssBaseline} from '@mui/material'
import { createTheme, ThemeProvider} from '@mui/material/styles'

import PlayerStats from "./components/playerStats"



const darkTheme = createTheme({ 
  palette: { 
    mode: 'dark',
    primary: {
      main: '#283593'
    },
    
  } 
})


function App() {
  const [player, setPlayer] = useState(null)
  return (
    
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
      <DenseAppBar
        setP={setPlayer}
      />
        <div className="UpperCont">
          <Live/>
        </div>
        <div>
          { player ? <PlayerStats games={player[0]}/> : <h3>Select player to show history</h3>}
        </div>
      </div>
    </ThemeProvider>
    
  );
}

export default App;
