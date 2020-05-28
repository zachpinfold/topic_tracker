import React from "react";
import { Link } from "@reach/router";
import ArticleVoteUpdator from "./ArticleVoteUpdator";

const ArticleCard = ({
  article_id,
  title,
  created_at,
  author,
  topic,
  comment_count,
  votes,
  colourLookUpObject
}) => {

  return (
    <div>
      <Link to={`/articles/article/${article_id}`}>
        <h3>{title}</h3>
      </Link>
      <p>{created_at}</p>
      <p>{author}</p>
      <p style={{ backgroundColor: colourLookUpObject[topic]}}>topic: {topic}</p>
      <p>comment count: {comment_count}</p>
      <ArticleVoteUpdator votes={votes} id={article_id} />
    </div>
  );
};

export default ArticleCard;
