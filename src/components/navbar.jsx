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
                    <Typography variant="h6">
                        Principal Global Services
        </Typography>
                    <div className={classes.toolbarButtons}>
                        <NavLink to="/tracker" style={{ fontSize: "large", margin: "10px", color: 'inherit', textDecoration: 'inherit' }}>
                            ASSET TRACKER
        </NavLink>
                        <NavLink to="/" style={{ fontSize: "large", margin: "10px", color: 'inherit', textDecoration: 'inherit' }}>
                            <b>HOME</b>
                        </NavLink>
                    </div>
                </Toolbar>
            </AppBar>
        )
    }
}
export default withStyles(styles)(Navbar);