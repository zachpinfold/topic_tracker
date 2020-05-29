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
  colourLookUpObject,
}) => {
  return (
    <div className={'article-card'}>
      <Link
        className={"article-card-title"}
        to={`/articles/article/${article_id}`}
      >
        <h2 className={"article-card-title"}>{title}</h2>
      </Link>
      <div className={"article-card-div"}>
        <div className={"article-card-div-left"}>
          <p className={"article-card-date"}>{created_at}</p>
          <p className={"article-card-username"}>{author}</p>
          <ArticleVoteUpdator topic={topic} colourLookUpObject={colourLookUpObject} votes={votes} id={article_id} />

          <p className={'article-card-comment'}>comment count: {comment_count}</p>

        </div>
        <div className={"article-card-div-right"}>
          <p className={'article-card-topic'} style={{ backgroundColor: colourLookUpObject[topic],  }}>
            {topic}
          </p>

        </div>

      </div>
    </div>
  );
};

export default ArticleCard;
