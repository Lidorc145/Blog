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
import MenuIcon from '@material-ui/icons/Menu';
import SwipeableMenu from "./SwipeableMenu";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

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
        },
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
                        <div className={classes.flex}>
                        <SwipeableMenu logout={props.logout} history={props.history} logged={props.logged} full_name={props.full_name} parentSetState={props.parentSetState}/>
                        <div className={classes.toolbar}>
                            <Typography className={classes.toolbar} variant="h4" noWrap>
                                <div className={classes.toolbar}><Link href="/Home"
                                                                                           style={{color: 'white'}}><b>BlogSystem</b></Link>
                                </div>
                            </Typography>
                        </div>
                        </div>

                        <div className={classes.toolbar}>   {showMobileUserMenu ? (<div>
                                <div className={classes.toolbar}>  {searchMenu(props)}</div>
                                <div className={classes.toolbar}>   {userMenu()}</div>
                            </div>
                        ):null}</div>
                    </div>
                </Toolbar>
                </MobileView>
                <BrowserView className={classes.flex}> <Toolbar>
                    <SwipeableMenu  logout={props.logout} logged={props.logged} full_name={props.full_name} history={props.history} parentSetState={props.parentSetState}/>
                    <Typography variant="h4" noWrap>
                        <Link href="/Home" style={{color: 'white'}}><b>BlogSystem</b></Link>
                        <div className={classes.grow}/>
                    </Typography>
                    <div className={classes.grow}/>
                    {searchMenu(props)}

                    {userMenu()}  </Toolbar>

                </BrowserView>
            </AppBar>
            <DialogSlideUP {...props} open={props.dialog} dialog={props.dialog} dialogContent={(<Login history={props.history}  parentSetState={props.parentSetState} sessionCheck={props.sessionCheck} logged={props.logged} />)} />
        </div>
    );

    function searchMenu(props) {
        let searchValue="";
        return (<div className={classes.search}>
            <div className={classes.searchIcon}>
                <SearchIcon onClick={()=>props.history.push('/Search/'+searchValue)}/>
            </div>
            <InputBase
                placeholder="Search…"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{'aria-label': 'search'}}
                onChange={(input)=>{searchValue=input.currentTarget.value}}
                onKeyPress={(event) => {
                    if(event.key === 'Enter'){
                        props.history.push('/Search/'+searchValue);
                    }}}
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
                <IconButton color="inherit" onClick={props.logout}>
                    <MeetingRoomIcon/>Logout</IconButton>
            </div>
        </div>) : (<div>
                <IconButton color="inherit"
                            onClick={() => props.parentSetState({dialog: true})}>
                    <MeetingRoomIcon/>LOGIN</IconButton>
                <IconButton color="inherit"
                            onClick={() => props.history.push("/SignUp")}>
                    <PersonAddIcon/> SIGN UP</IconButton>
                </div>
        )}</div>);
    }
}





export default NavBar;