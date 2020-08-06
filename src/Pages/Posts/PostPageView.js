import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import renderHTML from 'react-render-html';
import {Container, Paper, Grid, Chip} from '@material-ui/core';
import axios from "axios";
import PublishDateCalc from "../../Accessories/PublishDateCalc"
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
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
                    <Grid>
                        <Paper>
                    <article className="mainColumn">
                        <h1>{postData.title}</h1>
                        <b>{renderHTML(postData.summary)}</b><br/>
                        {renderHTML(entities.decode(postData.content))}
                        <ShowTagsList value={postData.tags_list} />
                        <p className="postFooter">Published <PublishDateCalc date={postData.publish_date}/> by {postData.auther_name}</p>
                    </article>
                        </Paper></Grid></Container>
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

export default PostPageView;