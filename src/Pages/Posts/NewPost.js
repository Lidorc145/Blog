import React from 'react';
import {Button, TextField, Typography, Card, CardActions, CardContent, Snackbar} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import {Editor} from '@tinymce/tinymce-react';
import ChipInput from 'material-ui-chip-input';
import MomentUtils from '@date-io/moment';
import {
    DateTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import {
    Redirect
} from "react-router-dom";
import axios from 'axios';
import moment from "moment";
import PermissionCheck from "../../Accessories/PermissionCheck";
import ReactHtmlParser from 'react-html-parser';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import LinearProgress from "@material-ui/core/LinearProgress";

class NewPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editPostID: props.match.params.id,
            dataRecived: false,
            auther_id: "",
            title: "",
            summary: "",
            content: "",
            image: "",
            publish_date: null,
            tags: [],
            alertType: null,
            response: null,
            alert: false,
            clicked: false
        };
        this.getPostData().then(this.setState({dataRecived: true}));
        console.log("NewPost",this.state);
    }

    async getPostData() {
        if (this.state.editPostID != undefined) {
            let loadingID = this.props.loading.Start();
            await (axios.get(window.location.origin + '/posts/id/' + this.state.editPostID).then(res => {
                if (res.data.length == 1) {
                    this.setState({
                        dataRecived: true,
                        title: res.data[0].title,
                        summary: res.data[0].summary,
                        content: ReactHtmlParser(res.data[0].content)[0],
                        auther_id: res.data[0].auther_id,
                        image: res.data[0].image,
                        publish_date: res.data[0].publish_date,
                        tags: JSON.parse(res.data[0].tags_list.replace(/&quot;/g, '"'))
                    });
                }
            }));
            this.props.loading.Stop(loadingID);
        }
    }

    handleAddChip(chip) {
        var tags = this.state.tags;
        tags.push(chip);
        this.setState({tags: tags});
    }

    handleDeleteChip(chip, index) {
        var tags = this.state.tags;
        tags.splice(index, 1);
        this.setState({tags: tags});
    }


    handlePublishDateChange = (e) => {
        this.setState({"publish_date": moment(e).format('YYYY-MM-DD HH:mm')});
    }

    handleInputChange = (e) => {
        if (e.target.id === 'content') {
            this.setState({content: e.target.getContent()});
        } else {
            this.setState({[e.target.id]: e.target.value});
            e.target.error = true;
        }
    }

    sendPost = () => {
        this.setState({clicked: true});
        let s = this.state;
        if (s.title && s.summary && s.content && s.image && s.publish_date) {
            const url = "/posts/";

            var data = {
                title: this.state.title,
                summary: this.state.summary,
                content: this.state.content,
                image: this.state.image,
                auther_id: this.props.id,
                last_update_date: this.state.publish_date,
                publish_date: this.state.publish_date,
                tags_list: JSON.stringify(this.state.tags)
            };

            let loadingID = this.props.loading.Start();
            axios.post(url, data)
                .then(() => {
                    this.setState({
                        title: "",
                        summary: "",
                        content: "",
                        image: "",
                        publish_date: null,
                        tags: [],
                        clicked: false
                    });
                    this.props.parentSetState({
                        alertType: "success",
                        alertData: "Success: The post added successfully!",
                        alert: true
                    });
                })
                .catch((err) => {
                    this.props.parentSetState({
                        alertType: "error",
                        alertData: " " + err,
                        alert: true
                    });
                });
            this.props.loading.Stop(loadingID);
        } else {
            /*this.props.parentSetState({
                alertType: "error",
                alertData: "Invalid values.",
                alert: true
            });*/
        }
    }

    updatePost = () => {
        this.setState({clicked: true});
        let s = this.state;
        if (s.title && s.summary && s.content && s.image && s.publish_date) {
            const url = "/posts/update/"+this.props.match.params.id;

            var data = {
                title: this.state.title,
                summary: this.state.summary,
                content: this.state.content,
                image: this.state.image,
                auther_id: this.props.id,
                last_update_date: this.state.publish_date,
                publish_date: this.state.publish_date,
                tags_list: JSON.stringify(this.state.tags)
            };

            let loadingID = this.props.loading.Start();
            axios.post(url, data)
                .then(() => {
                    this.setState({
                        clicked: false
                    });
                    this.props.parentSetState({
                        alertType: "success",
                        alertData: "Success: The post updated successfully!",
                        alert: true
                    });
                })
                .catch((err) => {
                    this.props.parentSetState({
                        alertType: "error",
                        alertData: " " + err,
                        alert: true
                    });
                });
            this.props.loading.Stop(loadingID);
        } else {
            this.props.parentSetState({
                alertType: "error",
                alertData: "Invalid values.",
                alert: true
            });
        }
    }

    render() {
        console.log("papa",this.props);
        if (!this.props.logged || !PermissionCheck(this.props.type, "auther")) {
            this.props.parentSetState({
                alert: true,
                alertType: "error",
                alertData: "No permission! please connect first.",
            });
            return (<Redirect to='/'/>);
        } else if (this.state.editPostID != null && !this.state.dataRecived) {
            return (<LinearProgress/>);
        } else if (this.state.editPostID != null && (this.props.id != this.state.auther_id && this.props.type!='admin' )) {
            this.props.parentSetState({
                alert: true,
                alertType: "error",
                alertData: "No permission! only admin and the current auther can edit the post.",
            });
            return (<Redirect to='/'/>);

        } else {
            return (
                <Card>
                    <CardContent>
                        <Typography variant="h4">
                            <i className="material-icons md-35">create</i>
                            {this.state.editPostID?"Edit Post":"New Post"}
                        </Typography>
                        <TextField
                            error={this.state.clicked && !this.state.title}
                            helperText={this.state.clicked && !this.state.title ? "Required" : null}
                            variant="outlined"
                            margin="dense"
                            required
                            fullWidth
                            id="title"
                            label="Title"
                            name="title"
                            autoComplete="off"
                            onChange={this.handleInputChange}
                            value={this.state.title}
                        />
                        <TextField
                            error={this.state.clicked && !this.state.summary}
                            helperText={this.state.clicked && !this.state.summary ? "Required" : null}
                            variant="outlined"
                            margin="dense"
                            required
                            fullWidth
                            id="summary"
                            label="Summary"
                            name="summary"
                            autoComplete="off"
                            rows={4}
                            rowsMax={4}
                            onChange={this.handleInputChange}
                            value={this.state.summary}
                            multiline
                        />
                        <TextField
                            error={this.state.clicked && !this.state.image}
                            helperText={this.state.clicked && !this.state.image ? "Required" : null}
                            variant="outlined"
                            margin="dense"
                            required
                            fullWidth
                            id="image"
                            label="Image URL"
                            name="image"
                            autoComplete="off"
                            value={this.state.image}
                            onChange={this.handleInputChange}
                        />
                        <div style={this.state.clicked && !this.state.content ? {
                            marginTop: 10,
                            borderStyle: "solid",
                            borderColor: "#f44336"
                        } : {marginTop: 10}}>
                            <Editor
                                value={this.state.content}
                                id="content"
                                init={{
                                    height: 500,

                                    menu: {
                                        tc: {
                                            title: 'TinyComments',
                                            items: 'addcomment showcomments deleteallconversations'
                                        }
                                    },
                                    menubar: 'file edit view insert format tools table tc help',
                                    plugins: [
                                        'advlist autolink lists link image',
                                        'charmap print preview anchor help',
                                        'searchreplace visualblocks code',
                                        'insertdatetime media table paste wordcount fullscreen'
                                    ],
                                    allow_conditional_comments: true,

                                    toolbar:
                                        'fullscreen  preview save print | undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment'
                                }}
                                apiKey="xxvvg9qhyrakxs5x5duy04pgns9qrj0x8ph71t1d7q0qz4ju"
                                onChange={this.handleInputChange}
                            /></div>

                        <ChipInput
                            value={this.state.tags}
                            fullWidth
                            variant="outlined"
                            label="Tags"
                            margin="normal"
                            onAdd={(chip) => this.handleAddChip(chip)}
                            onDelete={(chip, index) => this.handleDeleteChip(chip, index)}
                        />

                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <DateTimePicker id="publish_date" required minutesStep={5} autoOk
                                            error={this.state.clicked && !this.state.publish_date}
                                            helperText={this.state.clicked && !this.state.publish_date ? "Required" : null}
                                            value={this.state.publish_date} inputVariant="outlined" disablePast
                                            allowKeyboardControl onChange={this.handlePublishDateChange}
                                            label="Publish Date" ampm={false}
                                            format="DD/MM/YYYY HH:mm:00"/>
                        </MuiPickersUtilsProvider>

                    </CardContent><CardActions>
                    {(this.props.id == this.state.auther_id ||this.props.type==='admin') ?
                        (
                            <Button
                                style={{
                                    backgroundColor: "green",
                                }}
                                variant="contained"
                                type="submit"
                                fullWidth
                                color="primary"
                                onClick={this.updatePost}
                            >
                                Save
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={this.sendPost}
                            >
                                Publish
                            </Button>
                        )}
                </CardActions>
                </Card>
            );
        }
    }
}

export default NewPost;