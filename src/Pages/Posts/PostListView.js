import React from 'react';
import PublishDateCalc from "../../Accessories/PublishDateCalc";
import CardContent from "@material-ui/core/CardContent";
import {Card, CardMedia} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import {BrowserView,MobileView} from "react-device-detect";
import Button from "@material-ui/core/Button";
import ReactHtmlParser from 'react-html-parser';
import ShareDialog from '../../Components/ShareDialog'

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
        width: "100%",
        alignContent: "left",
        flexDirection: "column",
        justifyContent: "left",
        alignItems: "stretch"
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
                    <CardActionArea onClick={()=>{props.history.push("/Post/"+props.postID)}}>
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
                            {ReactHtmlParser(props.summary)[0]}
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary" onClick={() => { props.history.push("/Post/"+props.postID) }}>
                            Read More
                        </Button>
                        <Button size="small" color="primary" onClick={handleClickOpenShare}>
                            Share
                        </Button>
                        {(props.full_name===props.auther || props.type==='admin')?(
                            <Button size="small" color="primary" onClick={() => {  props.history.push("/Edit/Post/"+props.postID)  }}>
                                Edit
                            </Button>
                        ):null}
                    </CardActions>
                </Card>
            </MobileView>
                <BrowserView>
                    <Card className={classes.BrowserCardsRoot}>
                        <CardMedia
                            className={classes.cover}
                            image={props.image}
                            title={props.title}
                            onClick={()=>{props.history.push("/Post/"+props.postID)}}
                        />
                        <div className={classes.details}>
                        <CardActionArea className={classes.details} onClick={()=>{props.history.push("/Post/"+props.postID)}}>

                            <CardHeader
                                title={props.title}
                                subheader={"Published " + (PublishDateCalc({date: props.publishDate})) + " by " + props.auther}
                            />
                            <CardContent>
                                {ReactHtmlParser(props.summary)[0]}
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary" onClick={() => { props.history.push("/Post/"+props.postID) }}>
                                Read More
                            </Button>
                            <Button size="small" color="primary"  onClick={handleClickOpenShare}>
                                Share
                            </Button>{console.log("kaka",props)}
                            {(props.full_name===props.auther || props.type==='admin')?(
                                <Button size="small" color="primary" onClick={() => {  props.history.push("/Edit/Post/"+props.postID)  }}>
                                    Edit
                                </Button>
                            ):null}
                        </CardActions>
                        </div>
                    </Card>
                </BrowserView>
            <ShareDialog open={openShare} onClose={handleCloseShare} {...props}  url={window.location.origin+"/Post/"+props.postID}/>
        </div>
    );
}





export default PostListView;