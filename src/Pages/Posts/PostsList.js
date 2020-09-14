import React from 'react';
import PostListView from "../Posts/PostListView";
import axios from 'axios';


class PostsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postsData: [],
            numOfPosts: 10,
            page: this.props.page
        };
        this.getDataFromdb(this.props.page);
    }



    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if(this.props.page!==nextProps.page){ //page changes
            this.getDataFromdb(nextProps.page);
        }
        return true;
    }

    async getDataFromdb(page) {
        let loadingID = this.props.loading.Start();
        this.setState({postsData: []});
        await axios.get("../posts/page/" + page).then(res => {
            this.setState({postsData: res.data});
        })
        this.props.loading.Stop(loadingID);
    }

    render() {
        if (this.state.postsData.length !== null) {
            return this.state.postsData.map((item, key) => (
                <PostListView {...this.state} {...this.props} key={this.props.page+"_"+key.toString()} postID={item.id} postTitle={item.title}
                              postPreviewText={item.summary} postImage={item.image} postAuther={item.auther_name}
                              postPublishedTime={item.publish_date}/>
            ));
        }
        return null;
    }
}

export default PostsList;