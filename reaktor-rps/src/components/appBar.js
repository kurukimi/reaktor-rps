
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import PlayerDrawer from './sideDrawer'
export default function DenseAppBar({setP}) {
    
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <PlayerDrawer
            setP={setP}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            RPS Results
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}