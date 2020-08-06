import React from 'react';
import PostListView from "../Posts/PostListView";
import axios from 'axios';


class Posts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postsData: null,
            numOfPosts: 10
        };
        this.getDataFromdb();
    }


    async getDataFromdb() {
        await axios.get("posts/").then(res => {
            this.setState({postsData: res.data});
        })
    }

    render() {
        if (this.state.postsData != null) {
            return (this.state.postsData).map((item, key) => (
                <PostListView key={key.toString()} postID={item.id} postTitle={item.title} postPreviewText={item.summary} postImage={item.image} postAuther={item.auther_name} postPublishedTime={item.publish_date} />
            ));
        }
        return null;
    }
}


export default Posts;