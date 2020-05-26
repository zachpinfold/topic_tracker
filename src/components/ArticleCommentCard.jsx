import React from "react";

const ArticleCommentCard = ({ body, author, created_at, votes }) => {
  return (
    <div>
      <p>{author}</p>
      <p>{body}</p>
      <p>{created_at}</p>
      <p>votes: {votes}</p>
    </div>
  );
};

export default ArticleCommentCard;
