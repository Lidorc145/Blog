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
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import EmailIcon from '@material-ui/icons/Email';
import AssignmentIcon from '@material-ui/icons/Assignment';

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


                <MediaControlCard history={this.props.history} {...this.state} {...this.props} alignItems="strech" title={this.state.postTitle}
                                  summary={this.state.postPreviewText} image={this.state.postImage}
                                  publishDate={this.state.postPublishedTime} auther={this.state.postAuther}/>


            );
        }
        return null;
    }
}

const useStyles = makeStyles((theme) => ({
    root: {

        width: '100%'
    },
    MobileCardsRoot: {
        marginTop: '10px',
        marginBottom: '10px',
        width: '100%'
    },
    BrowserCardsRoot: {
        marginTop: '10px',
        marginBottom: '10px',
        display: 'flex',
        width: '100%'
    },
    container: {
        display: 'flex',
    },
    details: {
        display: "flex",
        flexDirection: "column"
    },
    cover: {
        maxWidth: "35%",
        minWidth: "35%",
        width: "35%",
        left: 0
    },
    controls: {
        display: 'flex',
        alignItems: 'left',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    media: {
        height: 150,
        paddingTop: '56.25%', // 16:9
    },
}));


function MediaControlCard(props) {
    const classes = useStyles();
    const [openShare, setOpenShare] = React.useState(false);

    const handleClickOpenShare = () => {
        setOpenShare(true);
    };

    const handleCloseShare = (value) => {
        setOpenShare(false);
    };
    return (
        <div>
            <MobileView>
                <Card className={classes.MobileCardsRoot}>
                    <CardActionArea onClick={()=>{props.history.push("./Post/"+props.postID)}}>
                        <CardMedia
                            className={classes.media}
                            image={props.image}
                            title={props.title}
                        />
                        <CardHeader
                            title={props.title}
                            subheader={"Published " + (PublishDateCalc({date: props.publishDate})) + " by " + props.auther}
                        />
                        <CardContent>
                           {props.summary}
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary" onClick={() => { props.history.push("./Post/"+props.postID) }}>
                            Read More
                        </Button>
                        <Button size="small" color="primary" onClick={handleClickOpenShare}>
                            Share
                        </Button>
                        <Button size="small" color="primary" onClick={() => {  props.history.push("./Edit/Post/"+props.postID)  }}>
                            Edit
                        </Button>
                    </CardActions>
                </Card>
            </MobileView>
                <BrowserView>
                    <Card className={classes.BrowserCardsRoot}>
                        <div className={classes.details}>
                        <CardActionArea onClick={()=>{props.history.push("./Post/"+props.postID)}}>

                            <CardHeader
                                title={props.title}
                                subheader={"Published " + (PublishDateCalc({date: props.publishDate})) + " by " + props.auther}
                            />
                            <CardContent>
                                {props.summary}
                            </CardContent>

                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary" onClick={() => { props.history.push("./Post/"+props.postID) }}>
                                Read More
                            </Button>
                            <Button size="small" color="primary"  onClick={handleClickOpenShare}>
                                Share
                            </Button>
                            <Button size="small" color="primary" onClick={() => {  props.history.push("./Edit/Post/"+props.postID)  }}>
                                Edit
                            </Button>
                        </CardActions>
                        </div>
                        <CardMedia
                            className={classes.cover}
                            image={props.image}
                            title={props.title}
                            onClick={()=>{props.history.push("./Post/"+props.postID)}}
                        />
                    </Card>
                </BrowserView>
            <ShareDialog open={openShare} onClose={handleCloseShare} />
        </div>
    );
}

function ShareDialog(props) {
    const classes = useStyles();
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Share</DialogTitle>
            <List>
                <ListItem autoFocus button onClick={handleClose}>
                    <ListItemAvatar>
                        <Avatar>
                            <AssignmentIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Copy to clipboard" />
                </ListItem>
                <ListItem autoFocus button onClick={handleClose}>
                    <ListItemAvatar>
                        <Avatar>
                            <EmailIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Email" />
                </ListItem>
                <ListItem autoFocus button onClick={handleClose}>
                    <ListItemAvatar>
                        <Avatar>
                            <FacebookIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Facebook" />
                </ListItem>
                <ListItem autoFocus button onClick={handleClose}>
                    <ListItemAvatar>
                        <Avatar>

                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Google+" />
                </ListItem>
                <ListItem autoFocus button onClick={handleClose}>
                    <ListItemAvatar>
                        <Avatar>
                            <TwitterIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Twitter" />
                </ListItem>
            </List>
        </Dialog>
    );
}



export default PostListView;