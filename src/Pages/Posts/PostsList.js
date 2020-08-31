import React from 'react';
import PostListView from "../Posts/PostListView";
import axios from 'axios';


class Posts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postsData: [],
            numOfPosts: 10,
            page: this.props.page.num
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
            this.getDataFromdb();
    }

    getDataFromdb() {
        if(this.state.postsData.length==0) {
            axios.get("../posts/page/" + this.state.page).then(res => {
                this.setState({postsData: res.data, page: this.state.page});
            })
        }
    }

    render() {
        if (this.state.postsData.length != null) {
            return this.state.postsData.map((item, key) => (
                <PostListView {...this.state} {...this.props} key={this.state.page+"_"+key.toString()} postID={item.id} postTitle={item.title}
                              postPreviewText={item.summary} postImage={item.image} postAuther={item.auther_name}
                              postPublishedTime={item.publish_date}/>
            ));
        }
        return null;
    }
}

export default Posts;