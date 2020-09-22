import React from 'react';
import axios from 'axios';
import {Card, Container} from "@material-ui/core";
import CardBody from "reactstrap/es/CardBody";
import CardContent from "@material-ui/core/CardContent";
import {makeStyles} from "@material-ui/core/styles";
import GridListTile from "@material-ui/core/GridListTile";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import HomeIcon from '@material-ui/icons/Home';
import GrainIcon from '@material-ui/icons/Grain';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';




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
                <GridListTile key={key}  spacing={3}><Link color="primary" variant={"outlined"}  onClick={()=> this.props.history.push('/Tags/id/'+item.tag_id)}>
                        <h2 style={{fontSize: parseInt(10+10*item.count/(max/10))+'px'}}>{item.tag_name}</h2>
                </Link></GridListTile>
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
    return (
        <div><IconBreadcrumbs/>
        <Card>
            <div align={"center"}>
                <CardBody>
                    <CardContent>
                        {props.tags}
                    </CardContent>
                </CardBody>
            </div>
        </Card></div>
    );
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
function IconBreadcrumbs() {
    const classes = useStyles();

    return (
        <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/" href="/home" className={classes.link}>
                <HomeIcon className={classes.icon} />
                Blog System
            </Link>
            <Typography color="textPrimary" className={classes.link}>
                <LocalOfferIcon className={classes.icon} />
                Tags
            </Typography>
        </Breadcrumbs>
    );
}

export default Tags;
