import React from "react";


const ArticleCommentCard = (props) => {
  
  return (
    <div>
      <p>{props.author}</p>
      <p>{props.body}</p>
      <p>{props.created_at}</p>
      <p>votes: {props.votes}</p>
      {props.username === props.author && <button onClick={() => {props.deleteComments(props.comment_id)}}>delete</button>}
    </div>
  );
};

export default ArticleCommentCard;
