import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import renderHTML from 'react-render-html';
import {Container, Chip, Card, CardMedia} from '@material-ui/core';
import axios from "axios";
import PublishDateCalc from "../../Accessories/PublishDateCalc"
import CardBody from "reactstrap/es/CardBody";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CardFooter from "reactstrap/es/CardFooter";
import Button from "@material-ui/core/Button";
import ShareDialog from "../../Components/ShareDialog";
import Grid from "@material-ui/core/Grid";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import HomeIcon from "@material-ui/icons/Home";
import DescriptionSharpIcon from '@material-ui/icons/DescriptionSharp';
import CardActions from "@material-ui/core/CardActions";
import CommentsSection from "../../Components/Comments/CommentsSection";

const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

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
    link: {
        display: 'flex',
    },
    icon: {
        marginRight: theme.spacing(0.5),
        width: 20,
        height: 20,
    }
}));

class PostPageView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postID: props.postID,
            postData: null
        };
        this.getDataFromdb();
    }

    async getDataFromdb() {
        let loadingID = this.props.loading.Start();
        await (axios.get("/posts/id/" + this.state.postID).then(res => {
            this.setState({postData: res.data});
        }).catch((err) => {
            this.props.parentSetState({
                alertType: "error",
                alertData: "ERROR: " + err,
                alert: true
            })}));
        this.props.loading.Stop(loadingID);
    }

    render() {
        if (this.state.postData != undefined) {
            let postData = this.state.postData[0];
            let tagsList = this.state.postData[1];
            return (
                <Container justify="center">
                    <MediaControlCard parentSetState={this.parentSetState} postID={this.state.postID} history={this.props.history} {...postData} tags_list={tagsList} {...this.props} />
                </Container>
            );
        }
        return null;
    }
}


function ShowTagsList(props) {
    const classes = useStyles();

    const handleClick = (tagID) => () => {
        props.history.push('/Tags/id/' + tagID);
    };

    let listTags = (entities.decode(props.value));
    let tags = (JSON.parse(listTags)).map((tag) => (
        <Chip  key={tag.tag_id} variant="outlined" onClick={handleClick(tag.tag_id)} color="primary"
               label={tag.tag_name}/>
    ));

    return (<div className={classes.root}>{tags}</div>);
}


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
        <Container justify="center">
            <IconBreadcrumbs postTitle={props.title} />
        <Card className={classes.root}>

            <div className={classes.details}>
                <Grid container justify={"flex-end"}>
                    <Button size="small" color="primary"  onClick={handleClickOpenShare}>
                        Share
                    </Button>
                    <ShareDialog open={openShare} onClose={handleCloseShare} {...props}  url={window.location.origin+"/Post/"+props.id}/>
                    {(props.fullName===props.auther_name || props.type==='admin')?(
                        <Button size="small" color="primary" onClick={() => {  props.history.push("/Edit/Post/"+props.id)  }}>
                            Edit
                        </Button>
                    ):null}
                </Grid>
                <CardBody> <Typography component="h5" variant="h5">
                    {props.title}
                </Typography>
                    <CardContent className={classes.content}>

                        <Typography variant="subtitle1" color="textSecondary">
                            {renderHTML(props.summary)} <br />Views: {props.num_of_views}
                        </Typography>
                        <ShowTagsList history={props.history} value={props.tags_list}/>
                    </CardContent>
                    <img src={props.image} width={"100%"} />
                    {renderHTML(entities.decode(props.content))}
                </CardBody>
                <CardFooter>
                    Published <PublishDateCalc date={props.publish_date}/> by {props.auther_name}
                </CardFooter>
            </div>
        </Card>
            <br />
            <CommentsSection {...props} postID={props.postID} loading={props.loading} parentSetState={props.parentSetState} />
        </Container>
    );
}

function IconBreadcrumbs(props) {
    const classes = useStyles();
    return (
        <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/Home" className={classes.link}>
                <HomeIcon className={classes.icon} />
                Blog System
            </Link>
            <Typography color="textPrimary" className={classes.link}>
                <DescriptionSharpIcon className={classes.icon} />
                Posts
            </Typography>
        </Breadcrumbs>
    );
}

export default PostPageView;