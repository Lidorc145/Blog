import React from 'react';
import renderHTML from 'react-render-html';
import PublishDateCalc from "../../Accessories/PublishDateCalc";
import {
    Link
} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import {Card, CardMedia} from "@material-ui/core";
import useTheme from "@material-ui/core/styles/useTheme";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CardFooter from "reactstrap/es/CardFooter";
import CardBody from "reactstrap/es/CardBody";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";




class PostListView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postID: props.postID,
            postTitle: props.postTitle,
            postImage: props.postImage,
            postPreviewText: props.postPreviewText,
            postPublishedTime: props.postPublishedTime,
            postAuther: props.postAuther
        };
    }


    render() {
        if (new Date(this.state.postPublishedTime).getTime() <= Date.now()) {
            return (

                <Link to={'Post/' + this.state.postID} >
                    <MediaControlCard title={this.state.postTitle} summary={this.state.postPreviewText} image={this.state.postImage} publishDate={this.state.postPublishedTime} auther={this.state.postAuther}/>
                </Link>


            );
        }
        return null;

    }
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: '100%'
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

function MediaControlCard(props) {
    const classes = useStyles();

    return (
        <CardActions className={classes.root}>
            <CardActionArea>
        <Card className={classes.root}>

            <div className={classes.details}>

                <CardBody> <Typography component="h5" variant="h5">
                    {props.title}
                </Typography>
                <CardContent className={classes.content}>

                    <Typography variant="subtitle1" color="textSecondary">
                        {renderHTML(props.summary)}
                    </Typography>
                </CardContent>
                    </CardBody>
               <CardFooter >
                    Published <PublishDateCalc date={props.publishDate}/> by {props.auther}
                </CardFooter>
            </div>
            <CardMedia
                className={classes.cover}
                image={props.image}
                title={props.title}
            />

        </Card>
            </CardActionArea>
        </CardActions>
    );
}


export default PostListView;