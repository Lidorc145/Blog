import React from 'react';
import PostListView from "../Posts/PostListView";
import axios from 'axios';
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import {Card} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import {makeStyles} from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import HomeIcon from "@material-ui/icons/Home";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import ViewListSharpIcon from '@material-ui/icons/ViewListSharp';

class TagsPostsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postsData: [],
            tagName: null
        };;
        this.getDataFromdb(this.props.tagID);
        console.log(this.props.tagID);
    }



    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if(this.props.tagID!==nextProps.tagID){ //page changes
            this.getDataFromdb(nextProps.tagID);
        }
        return true;
    }

    async getDataFromdb(tagID) {
        let loadingID = this.props.loading.Start();
        this.setState({postsData: []});
        await axios.get("/tags/id/" + tagID).then(res => {
            if(res.data[0].tag_name !== undefined) {
                this.setState({postsData: res.data, tagName: res.data[0].tag_name});
                console.log(res.data[0].tag_name);
            }
        })
        this.props.loading.Stop(loadingID);
    }

    render() {
        if (this.state.postsData.length !== null) {
            let posts = this.state.postsData.map((item, key) => (
                <PostListView {...this.state} {...this.props} key={this.props.page+"_"+key.toString()} postID={item.id} postTitle={item.title}
                              postPreviewText={item.summary} postImage={item.image} postAuther={item.auther_name}
                              postPublishedTime={item.publish_date}/>
            ));
            return (

                <Container justify="center"> <IconBreadcrumbs tagName={this.state.tagName} />
                    <Card>
                        <CardContent>

                    <ThemeProvider>
                        <Typography variant={"h6"}>{this.state.tagName && (<div>'{this.state.tagName}' tags:</div>)} </Typography>
                    </ThemeProvider>
                        </CardContent>
                    </Card>
                    {posts}

                </Container>
            );
        }
        return null;
    }
}

const useStyles = makeStyles((theme) => ({
    link: {
        display: 'flex',
    },
    icon: {
        marginRight: theme.spacing(0.5),
        width: 20,
        height: 20,
    }
}));

function IconBreadcrumbs(props) {
    const classes = useStyles();
    return (
        <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/Home" className={classes.link}>
                <HomeIcon className={classes.icon} />
                Blog System
            </Link>
            <Link color="inherit" href="/Tags" className={classes.link}>
                <LocalOfferIcon className={classes.icon} />
                Tags
            </Link>
            <Typography color="textPrimary" className={classes.link}>
                <ViewListSharpIcon className={classes.icon} />
                {props.tagName}
            </Typography>
        </Breadcrumbs>
    );
}

export default TagsPostsList;