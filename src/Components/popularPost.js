import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import React from "react";
import Grid from "@material-ui/core/Grid";
import CardFooter from "reactstrap/es/CardFooter";


export default function PopularPost(props){
    return (
        <Grid container spacing={3}>
            <Grid item spacing={3}>
        <Card  style={{display: 'flex'}} onClick={()=>props.history.push('/Post/'+props.id)}>
            <CardActionArea>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.title}
                    </Typography>
                </CardContent>
                <CardFooter >
                    <Typography variant="caption" color="textSecondary" component="p">
                       Views: {props.views}
                    </Typography>
                </CardFooter>
            </CardActionArea>
        </Card></Grid></Grid>
    );
}