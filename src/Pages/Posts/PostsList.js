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
        this.getDataFromdb();
    }

    componentDidUpdate(prevProps) {
        console.log(prevProps.page.num);
        if(this.props.page.num!=prevProps.page.num) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
        {
            this.getDataFromdb();
        }
    }

    async getDataFromdb() {
        await axios.get("../posts/page/"+this.props.page.num).then(res => {
            this.setState({postsData: res.data, page: this.props.page.num});
            console.log(res.data);
        })
    }

    render() {
        if (this.state.postsData.length != null) {
            return this.state.postsData.map((item, key) => (
                <PostListView key={this.state.page+"_"+key.toString()} postID={item.id} postTitle={item.title}
                              postPreviewText={item.summary} postImage={item.image} postAuther={item.auther_name}
                              postPublishedTime={item.publish_date}/>
            ));
        }
        return null;
    }
}

export default Posts;