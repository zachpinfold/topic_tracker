import React from 'react';
import { Link } from '@reach/router';
import ArticleVoteUpdator from './ArticleVoteUpdator';

const ArticleCard = ({article_id, title, created_at, author, topic, comment_count, votes}) => {
    return (
        <div>
            <Link to={`/articles/article/${article_id}`}><h3>{title}</h3></Link>
            <p>{created_at}</p>
            <p>{author}</p>
            <p>topic: {topic}</p>
            <p>comment count: {comment_count}</p>
            <ArticleVoteUpdator votes={votes} article_id={article_id}/>
        </div>
    );
};

export default ArticleCard;