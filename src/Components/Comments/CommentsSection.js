import React from 'react';
import CommentView from "./CommentView";
import { NavLink } from 'react-router-dom';
import axios from "axios";
import List from "@material-ui/core/List";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";


class CommentsSection extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            newCommentContent: null,
            postID: props.postID,
            postComments: null
        };

        this.handleEnter = this.handleEnter.bind(this);

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

    handleEnter = (e) => {
        var newComment = {
            content: this.state.newCommentContent,
            postID: this.state.postID
        }
        this.props.handleAddComment(newComment);
        e.target.value=null
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    render(){
        let listItems = (this.state.postComments!=null)?
            (this.state.postComments.map((item) => (<CommentView comment={item} {...this.props}/>))):null;


        return (
            <Card>
                <CardHeader>Comments:</CardHeader>
                <CardContent>
                <List>

                    {listItems}
                </List>
                <div>
                    <div className="new-comment-header">
                        <h5>post a comment</h5>
                        <h5>
                            <NavLink
                                className="modifier"
                                onClick={this.handleEnter}
                                to='/'>
                                post
                            </NavLink>
                        </h5>
                    </div>
                    <textarea
                        name="newCommentContent"
                        className="new-comment"
                        onChange={this.handleChange}
                        placeholder="Post comment goes here..."
                        // onKeyDown={(e) => (e.keyCode == 13)? this.handleEnter(e): null}

                        // value={this.state.newCommentContent}
                    >

                    </textarea>
                </div>
                </CardContent>
            </Card>
        );
    }
}

export default CommentsSection;