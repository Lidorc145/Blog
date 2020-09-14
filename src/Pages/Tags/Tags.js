import React from 'react';
import axios from 'axios';
import {Card, Container} from "@material-ui/core";
import CardBody from "reactstrap/es/CardBody";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import GridListTile from "@material-ui/core/GridListTile";
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


class Tags extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tagsData: [],
        };
        this.getTagsFromdb()
    }

    async getTagsFromdb() {
        let loadingID = this.props.loading.Start();
        //this.setState({tagsData: []});
        await axios.get("/tags/").then(res => {
            this.setState({tagsData: res.data});
            console.log(res.data[0].count);
        })
        this.props.loading.Stop(loadingID);
    }

    render() {

        let tagsButtons;
        if (this.state.tagsData.length != null) {
            let max=0;
            for (let i = 0; i < this.state.tagsData.length; i++) {
                if(this.state.tagsData[i].count>max){
                    max=this.state.tagsData[i].count;
                }
            }
            tagsButtons = this.state.tagsData.map((item, key) => (
                <GridListTile key={key}  spacing={3}><Button color="primary" variant={"outlined"}  onClick={()=> this.props.history.push('/Tags/id/'+item.tag_id)}>
                        <h2 style={{fontSize: parseInt(15+5*item.count/(max/20))+'px'}}>{item.tag_name}</h2>
                </Button></GridListTile>
            ));
        }
        return (
            <Container justify="center">
               <MediaControlCard tags={tagsButtons}/>

            </Container>
        );
    }
}

function MediaControlCard(props) {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <div className={classes.details} align={"center"}>
                <CardBody>

                    <CardContent className={classes.content}>
                        {props.tags}
                    </CardContent>
                </CardBody>
            </div>
        </Card>
    );
}
export default Tags;