import React from "react";
import useTheme from "@material-ui/core/styles/useTheme";
import {Card, Container} from "@material-ui/core";
import CardBody from "reactstrap/es/CardBody";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import renderHTML from "react-render-html";
import CardFooter from "reactstrap/es/CardFooter";
import {makeStyles} from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: '100%',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
    details: {
        display: 'block',
        flexDirection: 'column',
        width: '100%'
    },
    content: {
        flex: '1 0 auto',
        width: '100%'
    },
    cover: {
        width: 350,

    },
    controls: {
        display: 'flex',
        alignItems: 'left',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
}));


function AboutMe() {
   let title ="About Me";
 let text = "Text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text\n";
    return(<Container justify="center">
        <MediaControlCard title={title} text={text} />
    </Container>);
}

function MediaControlCard(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <div className={classes.details}>
                <CardBody>
                    <CardContent className={classes.content}>
                        <Typography component="h4" variant="h4">
                            <b>{props.title}</b>
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {renderHTML(props.text)}
                        </Typography>

                    </CardContent>
                </CardBody>
                <CardFooter >
                    Published by Lidor Cohen
                </CardFooter>
            </div>
        </Card>
    );
}

export default AboutMe;