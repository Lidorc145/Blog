import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import renderHTML from 'react-render-html';
import {Container, Chip, Card, CardMedia} from '@material-ui/core';
import axios from "axios";
import PublishDateCalc from "../../Accessories/PublishDateCalc"
import CardBody from "reactstrap/es/CardBody";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CardFooter from "reactstrap/es/CardFooter";
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
}));

class PostPageView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postID: props.match.params.id,
            postData: null
        };
        this.getDataFromdb();

    }

    async getDataFromdb() {
        await axios.get("/posts/id/" + this.state.postID).then(res => {
            this.setState({postData: res.data});
        })
    }

    render() {
        if(this.state.postData != null) {
                let postData = this.state.postData[0];
                return (
                    <Container justify="center">
                        <MediaControlCard {...postData} />
                    </Container>
                );
        }
        return null;
    }
}



function ShowTagsList(props)
{
    const classes = useStyles();

    const handleClick = () => {
        console.info('You clicked the Chip.');
    };

    let listTags =(entities.decode(props.value));
    let tags = (JSON.parse(listTags)).map( tagName => (
        <Chip key={tagName.toString()} variant="outlined" onClick={handleClick} color="primary" label={tagName} />
    ));

    return (<div className={classes.root}>{tags}</div>);
}



function MediaControlCard(props) {
    const classes = useStyles();

    return (
                <Card className={classes.root}>

                    <div className={classes.details}>

                        <CardBody> <Typography component="h5" variant="h5">
                            {props.title}
                        </Typography>
                            <CardContent className={classes.content}>

                                <Typography variant="subtitle1" color="textSecondary">
                                    {renderHTML(props.summary)}
                                </Typography>
                                <ShowTagsList value={props.tags_list} />
                            </CardContent>
                            {renderHTML(entities.decode(props.content))}
                        </CardBody>
                        <CardFooter >
                            Published <PublishDateCalc date={props.publish_date}/> by {props.auther_name}
                        </CardFooter>
                    </div>
                    <CardMedia
                        className={classes.cover}
                        image={props.image}
                        title={props.title}
                    />

                </Card>
    );
}

export default PostPageView;