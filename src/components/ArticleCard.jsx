import React from 'react';
import { Link } from '@reach/router';

const ArticleCard = ({article_id, title, created_at, author, topic, comment_count, votes, voteCounter}) => {
    return (
        <div>
            <Link to={`/articles/article/${article_id}`}><h3>{title}</h3></Link>
            <p>{created_at}</p>
            <p>{author}</p>
            <p>topic: {topic}</p>
            <p>comment count: {comment_count}</p>
            <p>votes: {votes}</p>
            <button onClick={() => voteCounter(article_id, 'up')}>Vote Up</button>
            <button onClick={() => voteCounter(article_id, 'down')}>Vote Down</button>
            {/* get rid of buttons  */}
        </div>
    );
};

export default ArticleCard;