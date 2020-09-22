import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import NavBar from "./NavBar";
import HomeIcon from "@material-ui/icons/Home";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import InfoIcon from '@material-ui/icons/Info';
import AddSharpIcon from '@material-ui/icons/AddSharp';
import {NavLink} from "react-router-dom";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import PersonAddIcon from "@material-ui/icons/PersonAdd";


const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

function SwipeableMenu(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        left: false
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            {props.full_name?(<div><ListItem style={{marginRight: '25px'}} >

                <ListItemText primary={"Hello "+props.full_name} />
            </ListItem>{console.log(props)}
                <ListItem style={{marginRight: '25px'}} button onClick={props.logout}   >
                    <ListItemText primary={"LOGOUT"} />
                </ListItem>
            <Divider /></div>):<List>
                <ListItem style={{marginRight: '25px'}} button onClick={() => props.parentSetState({dialog: true})}   >
                    <ListItemIcon><MeetingRoomIcon/></ListItemIcon>
                    <ListItemText primary={"LOGIN"} />
                </ListItem>
                <ListItem style={{marginRight: '25px'}} button component={NavLink} to={"/SignUp"}   >
                    <ListItemIcon><PersonAddIcon/></ListItemIcon>
                    <ListItemText primary={"SIGN UP"} />
                </ListItem>
            </List>}
            <List>
                    <ListItem style={{marginRight: '25px'}} button component={NavLink} to="/Home"   >
                        <ListItemIcon><HomeIcon/></ListItemIcon>
                        <ListItemText primary={"Home"} />
                    </ListItem>
                    <ListItem style={{marginRight: '25px'}} button component={NavLink} to="/AboutMe">
                    <ListItemIcon><InfoIcon/></ListItemIcon>
                    <ListItemText primary={"About me"} />
                    </ListItem>
                    <ListItem style={{marginRight: '25px'}} button component={NavLink} to="/Tags">
                    <ListItemIcon><LocalOfferIcon/></ListItemIcon>
                    <ListItemText primary={"Tags"} />
                    </ListItem>
                    <ListItem style={{marginRight: '25px'}} button component={NavLink} to="/NewPost">
                    <ListItemIcon><AddSharpIcon/></ListItemIcon>
                    <ListItemText primary={"Add post"} />
                    </ListItem>
            </List>
            <Divider />
        </div>
    );

    return (
        <div>
            <IconButton onClick={toggleDrawer('left', true)} edge="start" color="inherit" aria-label="menu">
                <MenuIcon />
            </IconButton>
                    <SwipeableDrawer
                        anchor={"left"}
                        open={state["left"]}
                        onClose={toggleDrawer("left", false)}
                        onOpen={toggleDrawer("left", true)}
                    >
                        <div className={classes.toolbar} align={"right"}>
                            <IconButton onClick={toggleDrawer('left', false)}>
                                {!state["left"] ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                            </IconButton>
                        </div>
                        {list("left")}
                    </SwipeableDrawer>
        </div>
    );
}



export default SwipeableMenu;