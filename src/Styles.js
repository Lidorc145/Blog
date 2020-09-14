import {fade, makeStyles} from "@material-ui/core/styles";
//import createMuiTheme from "@material-ui/core/styles/createMuiTheme";



function Styles() {
    /*const theme= createMuiTheme({
        palette: {
            primary: {
                main: "#2c9520",
            },
            secondary: {
                main: "#8d2525",
            },
        },
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
        mediaa: {
            height: 0,
            width: '100%',
            paddingTop: '56.25%', // 16:9
        },
    });*/
    const useStyles = makeStyles((theme) => ({
        root: {
            backgroundColor: theme.palette.background.paper,

        },
        grow: {
            flexGrow: 1,
        },
        menuButton: {
            display: 'none',
            marginRight: theme.spacing(2),
        },
        title: {

            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginRight: theme.spacing(2),
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(3),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
        toolbar: {

            width: '100%',
            alignContent: 'center',
            textAlign: 'center',
        },
        toolbarMobile: {
            display: 'table',
            width: '100%',
            alignContent: 'center',
            textAlign: 'center',
        },
        flex:{
            display: 'flex',
            width: '100%',
            alignContent: 'center',
            textAlign: 'center',
        },
        fab: {
            margin: theme.spacing(2),
        },
        absolute: {
            position: 'absolute',
            bottom: theme.spacing(2),
            right: theme.spacing(3),
        },
        mediaa: {
            height: 0,
            width: '100%',
            paddingTop: '56.25%', // 16:9
        },
        LoginButtons: {
            root: {
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                borderRadius: 3,
                border: 0,
                color: 'white',
                height: 48,
                padding: '0 30px',
                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            },
            color: "black",
            margin: "5px",

            alignSelf: "center",
            alignItems: "center",
            alignContent: "center"
        },
        Forms: {
            textAlign: "center",
            padding: "10px"
        },
        zIndex: {
            zIndex: 1
        }
    }));
    return useStyles;
}



export default Styles;

/*

import * as Styles from "../Styles.js";

in Function:
const classes = Styles.default()();


 */