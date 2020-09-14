import React from "react";
import {NavLink} from "react-router-dom";
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
import {createMuiTheme} from '@material-ui/core/styles';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import axios from "axios";
import Link from "@material-ui/core/Link";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import {BrowserView, MobileView} from "react-device-detect";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import DownIcon from '@material-ui/icons/KeyboardArrowDown';
import Tooltip from "@material-ui/core/Tooltip";
import DialogSlideUP from "./DialogSlideUP";
import Login from "../Pages/Login/Login";


function NavBar(props) {
    const classes = Styles.default()();
    const [showMobileUserMenu, switchMenu] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
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

    const theme= createMuiTheme({
        MuiToolbar: {
            regular: {
                backgroundColor: "#ffff00",
                color: "#000000",
                height: "32px",
                minHeight: "32px",
                '@media (min-width: 600px)': {
                    minHeight: "48px"
                }
            },
        }
    });

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
            id={menuId}
            keepMounted
            transformOrigin={{vertical: 'bottom', horizontal: 'left'}}
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
                props.parentSetState({
                    alert: true,
                    alertType: 'success',
                    alertData: "You are logged out.",
                    logged: false
                });
            })
            .catch((err) => {
                props.parentSetState({
                    alert: true,
                    alertType: 'error',
                    alertData: ("Error login" + err),
                    logged: false
                });
            });
    }

    return (
        <div className={classes.grow}>
            <AppBar >
                {renderMenu}
                <MobileView><Link onClick={() => {
                    switchMenu(!showMobileUserMenu);

                }}>
                    <div id="switchMenu">
                        <Zoom
                            key={1}
                            in={showMobileUserMenu}
                            timeout={500}
                            style={{
                                transitionDelay: `20ms`,
                            }}
                            unmountOnExit
                        >


                            <Tooltip theme={theme} title="Hide"><Fab size={"small"} color="secondary">
                                <UpIcon/>
                            </Fab></Tooltip>
                        </Zoom>
                    </div>
                </Link><Link onClick={() => {
                    switchMenu(!showMobileUserMenu);

                }}>
                    <div id="switchMenu">
                        <Zoom
                            key={2}
                            in={!showMobileUserMenu}
                            timeout={500}
                            style={{
                                transitionDelay: `20ms`,
                            }}
                            unmountOnExit
                        >


                            <Tooltip theme={theme} title="Show"><Fab size={"small"} color="secondary">
                                <DownIcon/>
                            </Fab></Tooltip>
                        </Zoom>

                    </div>
                </Link><Toolbar className={classes.toolbarMobile}>


                    <div className={classes.grow}>
                        <div className={classes.toolbar}>
                            <Typography className={classes.toolbar} variant="h4" noWrap>
                                <div className={classes.toolbar}><BookOutlinedIcon/> <Link href="/Home"
                                                                                           style={{color: 'white'}}><b>BlogSystem</b></Link>
                                </div>
                            </Typography>
                        </div>


                        <div className={classes.toolbar}>   {showMobileUserMenu ? (<div>
                                <div className={classes.toolbar}><LabelBottomNavigation {...props} /></div>

                                <div className={classes.toolbar}>  {searchMenu()}</div>
                                <div className={classes.toolbar}>   {userMenu()}</div>
                            </div>
                        ):null}</div>
                    </div>
                </Toolbar>
                </MobileView>
                <BrowserView className={classes.flex}> <Toolbar>
                    <Typography variant="h4" noWrap>
                        <BookOutlinedIcon/> <Link href="/Home" style={{color: 'white'}}><b>BlogSystem</b></Link>
                        <div className={classes.grow}/>
                    </Typography>
                    <div className={classes.grow}/>
                    <div className={classes.menubutton}>
                        <LabelBottomNavigation {...props} />
                    </div>
                    {searchMenu()}

                    {userMenu()}  </Toolbar>

                </BrowserView>
            </AppBar>
            <DialogSlideUP {...props} open={props.dialog} dialog={props.dialog} dialogContent={(<Login {...props} />)} />
        </div>
    );

    function searchMenu() {
        return (<div className={classes.search}>
            <div className={classes.searchIcon}>
                <SearchIcon/>
            </div>
            <InputBase
                placeholder="Search…"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{'aria-label': 'search'}}
            />
        </div>);
    }

    function userMenu() {
        return (<div>{props.logged ? (<div>
            <div>
                <IconButton color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <MailIcon/>
                    </Badge>
                </IconButton>
                <IconButton color="inherit">
                    <Badge badgeContent={17} color="secondary">
                        <NotificationsIcon/>
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
                    <AccountCircle/>
                </IconButton>
                <IconButton color="inherit" onClick={logout}>
                    <MeetingRoomIcon/>Logout</IconButton>
            </div>
        </div>) : (<div>
                <IconButton color="inherit"
                            onClick={() => props.parentSetState({dialog: true})}>
                    <MeetingRoomIcon/>LOGIN</IconButton>
                <IconButton color="inherit"
                            onClick={() => props.history.push("../SignUp")}>
                    <PersonAddIcon/> SIGN UP</IconButton>
                </div>
        )}</div>);
    }
}


function LabelBottomNavigation(props) {

    const testButton = (event, newValue) => {
        props.parentSetState({alert: true, alertType: 'info', alertData: 'Test button..'})
        console.info(props);
    };

    return (
        <Typography variant="subtitle1" noWrap>
            <NavLink to="/Home" className="inactive" activeClassName="active"> HOME </NavLink>
            |<NavLink to="/AboutMe" className="inactive" activeClassName="active"> ABOUT ME </NavLink>
            |<NavLink to="/NewPost" className="inactive" activeClassName="active"> NEW POST </NavLink>
            |<NavLink to="/Tags" className="inactive" activeClassName="active"> TAGS </NavLink>
            | <NavLink to={"/test"} className="inactive" activeClassName="active" onClick={testButton}>
            TEST </NavLink>

        </Typography>
    );
}


export default NavBar;