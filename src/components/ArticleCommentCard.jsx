import React from "react";
import ArticleVoteUpdator from "./ArticleVoteUpdator";


const ArticleCommentCard = (props) => {
  
  return (
    <div>
      <p>{props.author}</p>
      <p>{props.body}</p>
      <p>{props.created_at}</p>
      <ArticleVoteUpdator votes={props.votes} id={props.comment_id} comment={'comment'}/>
      {props.username === props.author && <button onClick={() => {props.deleteComments(props.comment_id)}}>delete</button>}
    </div>
  );
};

export default ArticleCommentCard;
