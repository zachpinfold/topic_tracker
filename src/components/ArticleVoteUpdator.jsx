import React, { Component } from "react";
import * as api from "../utils/utils";

class ArticleVoteUpdator extends Component {
  state = {
    userVote: 0,
  };

  handleUpdate = (voteDirection) => {
    this.setState(({ userVote }) => {
      let vote = 0;
      if (userVote === 0 && voteDirection === +1) vote = +1;
      if (userVote === 0 && voteDirection === -1) vote = -1;
      if (userVote === 1 && voteDirection === -1) vote = -2;
      if (userVote === -1 && voteDirection === +1) vote = +2;
      if (userVote === 1 && voteDirection === +1) vote = -1;
      if (userVote === -1 && voteDirection === -1) vote = +1;
      console.log(userVote);
      console.log(voteDirection);
      return {
        userVote: userVote + vote,
        // userVote: userVote === 0 ? userVote + vote : userVote - vote
      };
    });
    const { article_id } = this.props;
    let APIVote = 0;
    if (this.state.userVote === 0 && voteDirection === +1) APIVote = +1;
    if (this.state.userVote === 0 && voteDirection === -1) APIVote = -1;
    if (this.state.userVote === 1 && voteDirection === -1) APIVote = -2;
    if (this.state.userVote === -1 && voteDirection === +1) APIVote = +2;
    if (this.state.userVote === 1 && voteDirection === +1) APIVote = -1;
    if (this.state.userVote === -1 && voteDirection === -1) APIVote = +1;
    api.updateVoteById(article_id, APIVote);
  };

  render() {
    const { votes } = this.props;
    const { userVote } = this.state;
    return (
      <div>
        <p>{votes + userVote}</p>
        <button onClick={() => this.handleUpdate(+1)}>up vote</button>
        <button onClick={() => this.handleUpdate(-1)}>down vote</button>
      </div>
    );
  }
}

export default ArticleVoteUpdator;

{
  /* <p>votes: {votes}</p>
<button onClick={() => voteCounter(article_id, 'up')}>Vote Up</button>
<button onClick={() => voteCounter(article_id, 'down')}>Vote Down</button> */
}
