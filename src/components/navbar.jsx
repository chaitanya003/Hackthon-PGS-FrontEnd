import React from 'react';
import {AppBar, Toolbar, IconButton, Typography} from '@material-ui/core'

class Navbar extends React.Component{

render(){
    return(
        <AppBar position="static">
        <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
                PGS
            </IconButton>
            <Typography variant="h6">
                Principal Global Services
            </Typography>
        </Toolbar>
        </AppBar>
    )
}
}
export default Navbar;