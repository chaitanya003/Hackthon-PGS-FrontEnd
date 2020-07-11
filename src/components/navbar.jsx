import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, } from '@material-ui/core'
import { NavLink } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
const styles = {
    // this group of buttons will be aligned to the right side
    toolbarButtons: {
        marginLeft: 'auto',
    },
};


class Navbar extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <AppBar position="static" style={{ backgroundColor: "#53bbc9" }}>
                <Toolbar>
                    <NavLink to="/" style={{ color: 'inherit', textDecoration: 'inherit' }} >
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            PGS
            </IconButton>
                    </NavLink>
                    <Typography variant="h6">
                        Principal Global Services
        </Typography>
                    <div className={classes.toolbarButtons}>
                        <NavLink to="/tracker" style={{ fontSize: "large", margin: "10px", color: 'inherit', textDecoration: 'inherit' }}>
                            Tracker
        </NavLink>
                        <NavLink to="/" style={{ fontSize: "large", margin: "10px", color: 'inherit', textDecoration: 'inherit' }}>
                            <b>Home</b>
                        </NavLink>
                    </div>
                </Toolbar>
            </AppBar>
        )
    }
}
export default withStyles(styles)(Navbar);