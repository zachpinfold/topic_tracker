import React, { Component } from 'react';
import axios from 'axios';

class CommentAdder extends Component {

    state = {
        comment: {
            
        username: 'weegembump',
        body: 'This is a comment',
        article_id: 1,
        }
    }

    // handleInputChange = (event) => {
    //     const {name, value} = event.target
    //     console.log(name, value)
    //     this.setState({
    //         [name]: value,
    //     })
    // }

    handleCommentSubmit = (event) => {
        const {article_id} = this.props
        event.preventDefault();
        const {comment} = this.state
        console.log(comment)
        axios.post(`https://pinny-news.herokuapp.com/api/articles/1/comments`, comment).then((response) => {
            console.log(response.data)
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleCommentSubmit}>
                    <input type="text" placeholder="Add a comment..." name='body'/>
                    <button>add comment</button>
                </form>
            </div>
        );
    }
}

export default CommentAdder;