import React from "react";
import ArticleVoteUpdator from "./ArticleVoteUpdator";
import TimeAgo from "react-timeago";


const ArticleCommentCard = ({body, author, created_at, votes, comment_id, deleteComments, username}) => {
  return (
    <div className={'article-card'}>
      <p className={'article-comment-username'}>{author}</p>
      <p className={'article-comment-body'}>{body}</p>
      <TimeAgo date={created_at} className={"article-date"} />
      <ArticleVoteUpdator votes={votes} id={comment_id} comment={'comment'}/>
      {username === author && <button className={'article-comment-delete-button'} onClick={() => {deleteComments(comment_id)}}>delete comment</button>}
    </div>
  );
};

export default ArticleCommentCard;
