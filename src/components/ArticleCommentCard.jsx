import React from "react";
import DeleteCommentByUser from './DeleteCommentByUser';

const ArticleCommentCard = ({ body, author, created_at, votes, username }) => {
  return (
    <div>
      <p>{author}</p>
      <p>{body}</p>
      <p>{created_at}</p>
      <p>votes: {votes}</p>
      {username === author && <DeleteCommentByUser author={author}/>}
    </div>
  );
};

export default ArticleCommentCard;
