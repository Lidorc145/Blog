import React from "react";
import {
    NavLink, Router
} from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import * as Styles from "../Styles.js";
import BookOutlinedIcon from '@material-ui/icons/BookOutlined';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import axios from "axios";
import Link from "@material-ui/core/Link";

function NavBar(props) {
    const classes = Styles.default()();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };
    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    function logout() {
        let url = "../logout/";
        axios.post(url)
            .then((res) => {
                props.parentSetState({alert: true, alertType: 'success', alertData: "You are logged out.", logged: false});
            })
            .catch((err) => {
                props.parentSetState({alert: true, alertType: 'error', alertData: ("Error login"+err),logged: false});
            });
    }

    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                   <Typography className={classes.title} variant="h4" noWrap>
                       <BookOutlinedIcon />  <Link href="/Home" style={{color: 'white'}}><b>BlogSystem</b></Link>
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.menubutton}>

                        <LabelBottomNavigation {...props} />

                    </div>

                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    {props.logged?(<div>
                    <div className={classes.sectionDesktop}>
                        <IconButton aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <IconButton aria-label="show 17 new notifications" color="inherit">
                            <Badge badgeContent={17} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
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
                        <IconButton aria-label="show 4 new mails" color="inherit" onClick={logout}>
                            <MeetingRoomIcon />Logout</IconButton>
                    </div>
                    </div>):(
                        <IconButton aria-label="show 4 new mails" color="inherit" onClick={()=>props.parentSetState({dialog: true})}>
                            <MeetingRoomIcon />LOGIN</IconButton>
                        )}
                </Toolbar>
            </AppBar>

            {renderMenu}
        </div>
    );
}


function LabelBottomNavigation(props) {
    const theme = createMuiTheme({
        overrides: {
            // Style sheet name ⚛️
            MuiButton: {
                // Name of the rule
                text: {
                    // Some CSS
                    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                    borderRadius: 3,
                    border: 0,
                    color: 'white',
                    height: 48,
                    padding: '0 30px',
                    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                },
            },
        },
    });

    const classes = Styles.default()();
    const testButton = (event, newValue) => {
        props.parentSetState({alert: true, alertType: 'info', alertData: 'Test button..'})
        console.info(props);
    };

    return (
        <Typography className={classes.title} variant="h8" noWrap>
            <NavLink to="/Home" className="inactive" activeClassName="active"> HOME </NavLink>
            |<NavLink to="/AboutMe" className="inactive" activeClassName="active"> ABOUT ME </NavLink>
            |<NavLink to="/NewPost" className="inactive" activeClassName="active"> NEW POST </NavLink>
            | <NavLink to="#" className="inactive" activeClassName="active" onClick={testButton}>
            <ThemeProvider theme={theme}>


             TEST </ThemeProvider></NavLink>

        </Typography>
    );
}

export default NavBar;