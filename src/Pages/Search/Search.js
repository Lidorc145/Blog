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
import SearchIcon from '@material-ui/icons/Search';
import FindInPageIcon from '@material-ui/icons/FindInPage';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postsData: [],
            value:  this.props.value
        };
        this.getDataFromdb(this.props.value);
    }


    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if(this.state.value!==nextProps.value){ //page changes
            this.setState({value: nextProps.value});
            this.getDataFromdb(nextProps.value);
        }
        return true;
    }

    async getDataFromdb(searchValue) {
        if (this.state.value != null) {
            let loadingID = this.props.loading.Start();
            this.setState({postsData: []});
            await axios.get("/search/" + searchValue).then(res => {
                this.setState({postsData: res.data, value: searchValue});
            })
            this.props.loading.Stop(loadingID);
        }
    }

    render() {
        if (this.state.postsData.length !== null) {
            let posts = this.state.postsData.map((item, key) => (
               <div>{console.log(item)} <PostListView  {...this.state} {...this.props} key={this.props.page+"_"+key.toString()} postID={item.id} postTitle={item.title}
                              postPreviewText={item.summary} postImage={item.image} postAuther={item.auther_name}
                              postPublishedTime={item.publish_date}/></div>
            ));
            return (

                <Container justify="center"> <IconBreadcrumbs search={this.state.value} />
                    <Card>
                        <CardContent>
                                <Typography variant={"h6"}>{this.state.value && (<div>'{this.state.value}' Search:</div>)} </Typography>
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
            <Link color="inherit" href="/Search" className={classes.link}>
                <SearchIcon className={classes.icon} />
                Search
            </Link>
            <Typography color="textPrimary" className={classes.link}>
                <FindInPageIcon className={classes.icon} />
                {props.search}
            </Typography>
        </Breadcrumbs>
    );
}

export default Search;