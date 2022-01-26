import React, {  useState , createContext} from "react"
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


export const MenuContext = createContext()
export const PageContext = createContext()

function App() {
  const [player, setPlayer] = useState(null)
  const [page, setPage] = useState(1)
  return (
    <PageContext.Provider value={{page, setPage}}>
    <MenuContext.Provider value={{player, setPlayer}}>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
      <DenseAppBar
  
      />
        <div className="UpperCont">
          <Live/>
        </div>
        <div>
          { player ? <PlayerStats games={player}/> : <h3>Select player to show history</h3>}
        </div>
      </div>
    </ThemeProvider>
    </MenuContext.Provider>
    </PageContext.Provider>
  );
}

export default App;
