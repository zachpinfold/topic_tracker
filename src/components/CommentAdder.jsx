import React, { Component } from 'react';
import * as api from "../utils/utils";

class CommentAdder extends Component {

    state = {
        comment: ''
    }

    handleInputChange = (event) => {
        const {value} = event.target
        this.setState({ comment: value })
    }

    handleCommentSubmit = (event) => {
        console.log(this.props)
        event.preventDefault();
        const {article_id, username} = this.props
        const comment = {
            username: username,
            body: this.state.comment
        }
        api.addCommentById(article_id, comment).then(({data}) => {
            this.props.addComments(data)
        })
        this.setState({comment: ''})
    }

    render() {
        return (
            <div>
                <form className={'comment-form'} onSubmit={this.handleCommentSubmit}>
                    <input required type="text" onChange={this.handleInputChange} placeholder="Add a comment..." value={this.state.comment}/>
                    <button>add comment</button>
                </form>
            </div>
        );
    }
}

export default CommentAdder;