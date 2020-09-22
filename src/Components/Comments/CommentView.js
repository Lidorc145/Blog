import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {
    List,
    ListItem,
    Divider,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Typography
} from "@material-ui/core";
import {Grid} from "antd";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        backgroundColor: theme.palette.background.paper
    },
    fonts: {
        fontWeight: "bold"
    },
    inline: {
        display: "inline"
    }
}));

class CommentView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
           comment: props.comment
        };
    }

    deleteComment = () =>{
        this.props.handleDeleteComment(this.state.id)
    }

    render(){
        const comment = this.state.comment;
        console.log(comment)

        return (
<div>
            <ListItem key={comment.id} alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt={comment.full_name} src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText>
                    <table><tr><td  width={"100%"}>{comment.title}</td><td>{comment.full_name} ({comment.type})</td></tr></table>
                    {comment.content}
            </ListItemText>
            </ListItem>
        <Divider />
</div>
        );
    }
}

export default CommentView;