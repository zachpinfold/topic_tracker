import React, { Component } from "react";
import * as api from "../utils/utils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'

class ArticleVoteUpdator extends Component {
  state = {
    userVote: 0,
  };

  handleUpdate = (voteDirection) => {
    this.setState(({ userVote }) => {
      let vote = 0;
      // eslint-disable-next-line       
      if (userVote === 0 && voteDirection === 1 || userVote === -1 && voteDirection === -1) vote = 1;
      // eslint-disable-next-line   
      if (userVote === 0 && voteDirection === -1 || userVote === 1 && voteDirection === +1) vote = -1;
      if (userVote === 1 && voteDirection === -1) vote = -2;
      if (userVote === -1 && voteDirection === 1) vote = 2;
      return {
        userVote: userVote + vote,
      };
    });
    const { id } = this.props;
    const {comment} = this.props
    let APIVote = 0;
    if (this.state.userVote === 0 && voteDirection === 1) APIVote = 1;
    if (this.state.userVote === 0 && voteDirection === -1) APIVote = -1;
    if (this.state.userVote === 1 && voteDirection === -1) APIVote = -2;
    if (this.state.userVote === -1 && voteDirection === 1) APIVote = 2;
    if (this.state.userVote === 1 && voteDirection === 1) APIVote = -1;
    if (this.state.userVote === -1 && voteDirection === -1) APIVote = 1;
    if (comment) {
      api.updateVoteById(id, APIVote, comment)
    } else api.updateVoteById(id, APIVote);
  };

  render() {
    const { votes } = this.props;
    const { userVote } = this.state;
    return (
      <div className={'vote-div'}>
        <button onClick={() => this.handleUpdate(+1)} className={this.state.userVote === 1 ? 'button--upvote' : 'button--downvote'} >
        <FontAwesomeIcon className={'vote-icon'} icon={faAngleUp}/>
          </button>
        <button onClick={() => this.handleUpdate(-1)} className={this.state.userVote === -1 ? 'button--upvote' : 'button--downvote'}>
        <FontAwesomeIcon className={'vote-icon'} icon={faAngleDown}/>
        </button>
        <p className={this.state.userVote === 1 || this.state.userVote === -1 ? 'button--upvote--number' : 'button--downvote--number'}>{votes + userVote}</p>
      </div>
    );
  }
}

export default ArticleVoteUpdator;

