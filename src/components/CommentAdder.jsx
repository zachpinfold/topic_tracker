import React, { Component } from "react";
import * as api from "../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

class CommentAdder extends Component {
  state = {
    comment: "",
  };

  handleInputChange = (event) => {
    const { value } = event.target;
    this.setState({ comment: value });
  };

  handleCommentSubmit = (event) => {
    event.preventDefault();
    const { article_id, username } = this.props;
    const comment = {
      username: username,
      body: this.state.comment,
    };
    api.addCommentById(article_id, comment).then(({ data }) => {
      this.props.addComments(data);
    });
    this.setState({ comment: "" });
  };

  render() {
    return (
      <div>
        <form className={"comment-form"} onSubmit={this.handleCommentSubmit}>
          <textarea
            required
            type="text"
            onChange={this.handleInputChange}
            placeholder="Add a comment..."
            value={this.state.comment}
          />
          <div className={'comment-button-div'}>
          <button className={'add-comment-button'}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <p className={'comment-text'}>add comment</p>
          </div>
        </form>
      </div>
    );
  }
}

export default CommentAdder;
