import React from "react";
import ArticleVoteUpdator from "./ArticleVoteUpdator";


const ArticleCommentCard = (props) => {
  
  return (
    <div className={'article-card'}>
      <p className={'article-comment-username'}>{props.author}</p>
      <p className={'article-comment-body'}>{props.body}</p>
      <p className={'article-date'}>{props.created_at}</p>
      <ArticleVoteUpdator votes={props.votes} id={props.comment_id} comment={'comment'}/>
      {props.username === props.author && <button className={'article-comment-delete-button'} onClick={() => {props.deleteComments(props.comment_id)}}>delete comment</button>}
    </div>
  );
};

export default ArticleCommentCard;
