import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import {CopyToClipboard} from "react-copy-to-clipboard";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ListItemText from "@material-ui/core/ListItemText";
import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    PinterestIcon,
    PinterestShareButton, RedditIcon, RedditShareButton, TumblrIcon, TumblrShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton
} from "react-share";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

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

function ShareDialog(props) {
    const classes = useStyles();
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Share</DialogTitle>
            <List className={classes.details}>
                <CopyToClipboard text={props.title+"\n"+props.summary+"\n"+props.url}>
                    <ListItem autoFocus button onClick={handleClose}>
                        <ListItemAvatar>
                            <Avatar>
                                <FileCopyIcon/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Copy to clipboard" />
                    </ListItem>
                </CopyToClipboard>
                <EmailShareButton url={props.url} subject={props.title} title={props.title} description={props.summary} quote={props.title+"\n"+props.summary}>
                    <ListItem autoFocus button onClick={handleClose}>
                        <ListItemAvatar>
                            <Avatar>
                                <EmailIcon/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Email" />
                    </ListItem>
                </EmailShareButton>
                <WhatsappShareButton url={props.url} subject={props.title} title={props.title} description={props.summary} quote={props.title+"\n"+props.summary}>
                    <ListItem autoFocus button onClick={handleClose}>
                        <ListItemAvatar>
                            <Avatar>
                                <WhatsappIcon/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="WhatsApp" />
                    </ListItem>
                </WhatsappShareButton>
                <FacebookShareButton url={props.url} subject={props.title} title={props.title} description={props.summary} quote={props.title+"\n"+props.summary}>
                    <ListItem autoFocus button onClick={handleClose}>
                        <ListItemAvatar>
                            <Avatar>
                                <FacebookIcon/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Facebook" />
                    </ListItem>
                </FacebookShareButton>
                <LinkedinShareButton url={props.url} subject={props.title} title={props.title} description={props.summary} quote={props.title+"\n"+props.summary}>
                    <ListItem autoFocus button onClick={handleClose}>
                        <ListItemAvatar>
                            <Avatar>
                                <LinkedinIcon/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="LinkedIn" />
                    </ListItem>
                </LinkedinShareButton>
                <TwitterShareButton url={props.url} subject={props.title} title={props.title} description={props.summary} quote={props.title+"\n"+props.summary}>
                    <ListItem autoFocus button onClick={handleClose}>
                        <ListItemAvatar>
                            <Avatar>
                                <TwitterIcon/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Twitter" />
                    </ListItem>
                </TwitterShareButton>
                <PinterestShareButton url={props.url} subject={props.title} title={props.title} description={props.summary} quote={props.title+"\n"+props.summary}>
                    <ListItem autoFocus button onClick={handleClose}>
                        <ListItemAvatar>
                            <Avatar>
                                <PinterestIcon/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Pinterest" />
                    </ListItem>
                </PinterestShareButton>
                <RedditShareButton url={props.url} subject={props.title} title={props.title} description={props.summary} quote={props.title+"\n"+props.summary}>
                    <ListItem autoFocus button onClick={handleClose}>
                        <ListItemAvatar>
                            <Avatar>
                                <RedditIcon/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Reddit" />
                    </ListItem>
                </RedditShareButton>
                <TumblrShareButton url={props.url} subject={props.title} title={props.title} description={props.summary} quote={props.title+"\n"+props.summary}>
                    <ListItem autoFocus button onClick={handleClose}>
                        <ListItemAvatar>
                            <Avatar>
                                <TumblrIcon/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Tumblr" />
                    </ListItem>
                </TumblrShareButton>

            </List>
        </Dialog>
    );
}

export default ShareDialog;