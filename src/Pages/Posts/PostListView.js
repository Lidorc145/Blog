import React from 'react';
import renderHTML from 'react-render-html';
import PublishDateCalc from "../../Accessories/PublishDateCalc";
import {
    Link
} from "react-router-dom";

class PostListView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postID: props.postID,
            postTitle: props.postTitle,
            postImage: props.postImage,
            postPreviewText: props.postPreviewText,
            postPublishedTime: props.postPublishedTime,
            postAuther: props.postAuther
        };
    }

    render() {
        if (new Date(this.state.postPublishedTime).getTime() <= Date.now()) {
            return (
                <Link to={'Post/' + this.state.postID}>
                    <section className="postSection" id={this.state.postID}>
                        <img src={this.state.postImage} alt="" id="postImage#2" className="postImage"/>
                        <div className="postContent">
                            <p className="postTitle">{this.state.postTitle}</p><br/>

                            {renderHTML(this.state.postPreviewText)}
                        </div>
                        <p className="postFooter">Published <PublishDateCalc date={this.state.postPublishedTime}/> by {this.state.postAuther}</p>
                    </section>
                </Link>
            );
        }
        return null;

    }
}



export default PostListView;