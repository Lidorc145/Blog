import React from "react";
import axios from "axios";
import PostListView from "../Pages/Posts/PostListView";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import CardActionArea from "@material-ui/core/CardActionArea";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import makeStyles from "@material-ui/core/styles/makeStyles";
// @ts-ignore
import PopularPost from "../Components/PopularPost"


class Popular extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postsData: [],
        };
        this.getDataFromdb();
    }

    async getDataFromdb() {
        let loadingID = this.props.loading.Start();
        this.setState({postsData: []});
        await axios.get("/posts/popular/").then(res => {
            this.setState({postsData: res.data});
        })
        this.props.loading.Stop(loadingID);
    }



    render() {
        if (this.state.postsData.length !== null) {
            let popularPosts =  this.state.postsData.map((item, key) => (
                <PopularPost history={this.props.history} id={item.id} views={item.views} image={item.image} title={item.title} summary={item.summary} />
            ));
            return (
                <div>
                    <h1>Popular</h1>
                    {popularPosts}
                </div>
            );
        }
        return null;
    }

}


export default Popular;