import React, { useState } from 'react';
import AppBar from "@material-ui/core/AppBar";
import AccountCircle from '@material-ui/icons/AccountCircle';
import Badge from '@material-ui/core/Badge';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import MailIcon from '@material-ui/icons/Mail';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import './Header.css';



function Header() {

    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const menuId = 'primary-search-account-menu';

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleMenuClose = () => {
        setAnchorEl(null);
    }

    const renderProfile = (
        <Menu
        anchorEl={anchorEl}
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
        id={menuId}
        keepMounted
        open={isMenuOpen}
        onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose}> My Account </MenuItem>
            <MenuItem onClick={handleMenuClose}> Settings </MenuItem>
            <MenuItem onClick={handleMenuClose}> Logout </MenuItem>
        </Menu>
        );


    return (
        <div className='header'>
            <AppBar position="static">
                <Toolbar>
                    <Grid container>
                        <Grid container direction="row" alignItems="center" wrap="nowrap">
                            <Grid container>
                                <Typography>
                                    KanBan
                                </Typography>
                            </Grid>
                            <Grid container style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
                                <Grid item>
                                    <IconButton aria-label="show 4 new mails" color="inherit">
                                        <Badge badgeContent={4} color="secondary">
                                            <MailIcon />
                                        </Badge>
                                    </IconButton>
                                </Grid>
                                <Grid item>
                                    <IconButton aria-label="show 17 new notifications" color="inherit">
                                        <Badge badgeContent={17} color="secondary">
                                            <NotificationsIcon />
                                        </Badge>
                                    </IconButton>
                                </Grid>
                                <Grid item>
                                    <IconButton
                                        edge="end"
                                        aria-label="account of current user"
                                        aria-controls={menuId}
                                        aria-haspopup="true"
                                        onClick={handleProfileMenuOpen}
                                        color="inherit"
                                    >
                                        <AccountCircle />
                                    </IconButton>

                                    {renderProfile}
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header;
