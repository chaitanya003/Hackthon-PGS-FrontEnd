import React from 'react';
import {AppBar, Toolbar, IconButton, Typography,} from '@material-ui/core'
import {NavLink} from 'react-router-dom';
class Navbar extends React.Component{

render(){
    return(
        <AppBar position="static">
        <Toolbar>
        <NavLink to ="/" style={{ color: 'inherit', textDecoration: 'inherit'}} ><IconButton edge="start" color="inherit" aria-label="menu">
                PGS
            </IconButton></NavLink>
            <Typography variant="h6">
                Principal Global Services
            </Typography>
        </Toolbar>
        </AppBar>
    )
}
}
export default Navbar;