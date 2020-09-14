import React from 'react';
import PostListView from "../Posts/PostListView";
import axios from 'axios';
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import ThemeProvider from "@material-ui/styles/ThemeProvider";

class TagsPostsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postsData: [],
            tagName: null
        };
        this.getDataFromdb(this.props.tagID);
        console.log(this.props.tagID);
    }



    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if(this.props.tagID!==nextProps.tagID){ //page changes
            this.getDataFromdb(nextProps.tagID);
        }
        return true;
    }

    async getDataFromdb(tagID) {
        let loadingID = this.props.loading.Start();
        this.setState({postsData: []});
        await axios.get("/tags/id/" + tagID).then(res => {
            if(res.data[0].tag_name !== undefined) {
                this.setState({postsData: res.data, tagName: res.data[0].tag_name});
                console.log(res.data[0].tag_name);
            }
        })
        this.props.loading.Stop(loadingID);
    }

    render() {
        if (this.state.postsData.length !== null) {
            let posts = this.state.postsData.map((item, key) => (
                <PostListView {...this.state} {...this.props} key={this.props.page+"_"+key.toString()} postID={item.id} postTitle={item.title}
                              postPreviewText={item.summary} postImage={item.image} postAuther={item.auther_name}
                              postPublishedTime={item.publish_date}/>
            ));
            return (
                <Container>

                    <ThemeProvider>
                        <Typography variant={"h2"}>{this.state.tagName && (<div><b>Tags:</b>{this.state.tagName}</div>)} </Typography>
                    </ThemeProvider>
                    {posts}
                </Container>
            );
        }
        return null;
    }
}

export default TagsPostsList;