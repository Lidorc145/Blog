import React from 'react';
import renderHTML from 'react-render-html';
import PublishDateCalc from "../../Accessories/PublishDateCalc";
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import {Card, CardMedia} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardHeader from "@material-ui/core/CardHeader";
import {BrowserView,MobileView} from "react-device-detect";


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


                <MediaControlCard {...this.state} {...this.props} alignItems="strech" title={this.state.postTitle}
                                  summary={this.state.postPreviewText} image={this.state.postImage}
                                  publishDate={this.state.postPublishedTime} auther={this.state.postAuther}/>


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
    container: {
        display: 'flex',
    },

    cover: {
        width: 350,
        left: 0
    },
    controls: {
        display: 'flex',
        alignItems: 'left',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    media: {
        height: 0,

        paddingTop: '56.25%', // 16:9
    },

}));


function MediaControlCard(props) {
    const classes = useStyles();
    let moreButtonPressed = false;
    const checkButtonPressed = (event) => {
        if (event.target.tagName === "svg" || event.target.tagName === "BUTTON" || event.target.tagName === "path") {
            props.parentSetState({
                alert: true,
                alertType: 'info',
                alertData: 'More button pressed on post ID: ' + props.postID
            });
        } else {
            props.parentSetState({page: {alertData: 'postView', id: props.postID}});
        }
    }

    return (
        <CardActions className={classes.root}>
            <CardActionArea onClick={checkButtonPressed}>
                <MobileView>
                <Card>
                        <CardMedia
                            className={classes.media}
                            image={props.image}
                            title={props.title}
                        />

                        <CardHeader
                            action={
                                <IconButton id="more" aria-label="settings" onClick={checkButtonPressed}>
                                    <MoreVertIcon/>
                                </IconButton>
                            }
                            title={<Link to={'Post/' + props.postID}>{props.title}</Link>}
                            subheader={"Published " + (PublishDateCalc({date: props.publishDate})) + " by " + props.auther}

                        />
                        <CardContent className={classes.content}>
                            <Typography variant="subtitle1" color="textSecondary">
                                {renderHTML(props.summary)}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon/>
                            </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon/>
                            </IconButton>
                        </CardActions>
                </Card>
                </MobileView>
                    <BrowserView>
                        <Card className={classes.root}>
                        <div >
                            <CardHeader
                                action={
                                    <IconButton id="more" aria-label="settings" onClick={checkButtonPressed}>
                                        <MoreVertIcon/>
                                    </IconButton>
                                }
                                title={<Link to={'Post/' + props.postID}>{props.title}</Link>}
                                subheader={"Published " + (PublishDateCalc({date: props.publishDate})) + " by " + props.auther}

                            />
                            <CardContent className={classes.content}>
                                <Typography variant="subtitle1" color="textSecondary " >
                                    {renderHTML(props.summary)}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites">
                                    <FavoriteIcon/>
                                </IconButton>
                                <IconButton aria-label="share">
                                    <ShareIcon/>
                                </IconButton>
                            </CardActions>
                        </div>
                        <CardMedia
                            className={classes.cover}
                            image={props.image}
                            title={props.title}
                        />
                        </Card>
                    </BrowserView>

            </CardActionArea>

        </CardActions>
    );
}


export default PostListView;