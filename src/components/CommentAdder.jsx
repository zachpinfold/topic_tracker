import React, { Component } from 'react';
import axios from 'axios';

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
        axios.post(`https://pinny-news.herokuapp.com/api/articles/${article_id}/comments`, comment).then(({data}) => {
            this.props.addComments(data)
        })
        this.setState({body: ''})
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleCommentSubmit}>
                    <input type="text" onChange={this.handleInputChange} placeholder="Add a comment..." value={this.state.comment}/>
                    <button>add comment</button>
                </form>
            </div>
        );
    }
}

export default CommentAdder;