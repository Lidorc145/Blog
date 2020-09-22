import React from 'react';
import CommentView from "./CommentView";
import { NavLink } from 'react-router-dom';
import axios from "axios";
import List from "@material-ui/core/List";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";


class CommentsSection extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            newCommentContent: null,
            postID: props.postID,
            postComments: null
        };

    }

    componentDidMount() {
        this.getComments();
    }

    async getComments() {
        let loadingID = this.props.loading.Start();

        await (axios.get("/comments/" + this.state.postID).then(res => {
            this.setState({postComments: res.data});
        }).catch((err) => {
            this.props.parentSetState({
                alertType: "error",
                alertData: "ERROR: " + err,
                alert: true
            })}));
        this.props.loading.Stop(loadingID);

    }


    addComment = (e) => {
        let loadingID = this.props.loading.Start();

        axios.post("/comments/add/" + this.state.postID,{content: this.state.newCommentContent}).then(res => {
            this.setState({postComments: res.data, newCommentContent: ""});
        }).catch((err) => {
            this.props.parentSetState({
                alertType: "error",
                alertData: "ERROR: " + err,
                alert: true
            })});
        this.props.loading.Stop(loadingID);
    }


    render(){
        console.log(this.props);
        let listItems = (this.state.postComments!=null)?
            (this.state.postComments.map((item) => (<CommentView comment={item} {...this.props}/>))):null;


        return (
            <Card>
                <CardContent>Comments:
                <List>

                    {listItems}
                </List>
                <div>
                    <div className="new-comment-header">
                        <h5>Send a comment:</h5>
                        <h5>

                        </h5>
                    </div>

                    <TextField required fullWidth disabled={!this.props.logged}  error={!this.props.logged} value={!this.props.logged?("Please login to comment"):this.state.newCommentContent} id="outlined-basic" variant="outlined" onChange={(target)=> this.setState({newCommentContent: target.currentTarget.value}) } onKeyDown={(e) => (e.keyCode == 13)? this.addComment(e): null}/>

                    <Button style={{marginTop: '5px'}} disabled={!this.props.logged} variant={"outlined"} fullWidth color="primary" onClick={this.addComment}>
                        Send
                    </Button>
                </div>
                </CardContent>
            </Card>
        );
    }
}

export default CommentsSection;