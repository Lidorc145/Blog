import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {
    List,
    ListItem,
    Divider,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Typography, TextField
} from "@material-ui/core";
import {Grid} from "antd";
import Button from "@material-ui/core/Button";
import axios from "axios";

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
    constructor(props) {
        super(props);
        this.state = {
            id: props.comment.id,
            content: props.comment.content,
            full_name: props.comment.full_name,
            publish_date: props.comment.publish_date,
            type: props.comment.type,
            editable: false,
            deleted: false
        };
    }

    deleteComment = () => {
        let loadingID = this.props.loading.Start();

        axios.post("/comments/delete/" + this.state.id, {content: this.state.content}).then(res => {
            this.setState({deleted: true});
        }).catch((err) => {
            this.props.parentSetState({
                alertType: "error",
                alertData: "ERROR: " + err,
                alert: true
            })
        });
        this.props.loading.Stop(loadingID);
    }

    editComment = () => {
        let loadingID = this.props.loading.Start();

        axios.post("/comments/edit/" + this.state.id, {content: this.state.content}).then(res => {
            this.setState({editable: false});
        }).catch((err) => {
            this.props.parentSetState({
                alertType: "error",
                alertData: "ERROR: " + err,
                alert: true
            })
        });
        this.props.loading.Stop(loadingID);
    }


    render() {
        if(!this.state.deleted) {
            return (
                <div>
                    <ListItem key={this.state.id} alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt={this.state.full_name} src="/static/images/avatar/1.jpg"/>
                        </ListItemAvatar>
                        <ListItemText>
                            {this.state.full_name} ({this.state.type})<br/><Typography
                            variant={"caption"}>{this.state.publish_date}</Typography><br/>
                            {this.state.editable ?
                                (<TextField required fullWidth value={this.state.content} id="outlined-basic"
                                            variant="outlined"
                                            onChange={(target) => this.setState({content: target.currentTarget.value})}/>) : this.state.content}<br/>
                            {!this.state.editable && (this.props.fullName === this.state.full_name) && (
                                <Button style={{marginTop: '5px', marginRight: '5px'}} size="small" color="primary"
                                        onClick={() => {
                                            this.setState({editable: true});
                                        }}>
                                    Edit
                                </Button>
                            )}
                            {this.state.editable ? (
                                <Button style={{marginTop: '5px', marginRight: '5px'}} size="small" color="primary"
                                        onClick={this.editComment}>
                                    Save
                                </Button>) : null}
                            {(this.props.type === 'admin' || this.props.fullName === this.state.full_name) && (
                                <Button style={{marginTop: '5px'}} size="small" color="primary"
                                        onClick={this.deleteComment}>
                                    Delete
                                </Button>
                            )}
                        </ListItemText>
                    </ListItem>
                    <Divider/>

                </div>
            );
        }
        return "";
    }
}

export default CommentView;