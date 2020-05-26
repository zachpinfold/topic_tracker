import React from 'react';

const ArticleCard = ({title, created_at, author, topic, comment_count, votes}) => {
    return (
        <div>
            <h3>{title}</h3>
            <p>{created_at}</p>
            <p>{author}</p>
            <button>{topic}</button>
            <button>{comment_count}</button>
            <button>{votes}</button>
        </div>
    );
};

export default ArticleCard;